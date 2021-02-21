package com.external.plugins;

import com.appsmith.external.models.ActionConfiguration;
import com.appsmith.external.models.ActionExecutionResult;
import com.appsmith.external.models.DBAuth;
import com.appsmith.external.models.DatasourceConfiguration;
import com.appsmith.external.models.DatasourceStructure;
import com.appsmith.external.models.Endpoint;
import lombok.extern.log4j.Log4j;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.testcontainers.containers.GenericContainer;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeDefinition;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.CreateTableRequest;
import software.amazon.awssdk.services.dynamodb.model.KeySchemaElement;
import software.amazon.awssdk.services.dynamodb.model.KeyType;
import software.amazon.awssdk.services.dynamodb.model.ProvisionedThroughput;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScalarAttributeType;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

@Log4j
public class DynamoPluginTest {

    private final static DynamoPlugin.DynamoPluginExecutor pluginExecutor = new DynamoPlugin.DynamoPluginExecutor();

    @SuppressWarnings("rawtypes")
    @ClassRule
    public static GenericContainer container = new GenericContainer(CompletableFuture.completedFuture("amazon/dynamodb-local"))
            .withExposedPorts(8000);

    private final static DatasourceConfiguration dsConfig = new DatasourceConfiguration();

    @BeforeClass
    public static void setUp() {
        final String host = "localhost";
        final Integer port = container.getMappedPort(8000);

        final StaticCredentialsProvider credentialsProvider = StaticCredentialsProvider.create(
                AwsBasicCredentials.create("dummy", "dummy")
        );

        DynamoDbClient ddb = DynamoDbClient.builder()
                .region(Region.AP_SOUTH_1)
                .endpointOverride(URI.create("http://" + host + ":" + port))
                .credentialsProvider(credentialsProvider)
                .build();

        ddb.createTable(CreateTableRequest.builder()
                .tableName("cities")
                .attributeDefinitions(
                        AttributeDefinition.builder().attributeName("Id").attributeType(ScalarAttributeType.S).build()
                )
                .keySchema(
                        KeySchemaElement.builder().attributeName("Id").keyType(KeyType.HASH).build()
                )
                .provisionedThroughput(
                        ProvisionedThroughput.builder().readCapacityUnits(5L).writeCapacityUnits(5L).build()
                )
                .build());

        ddb.putItem(PutItemRequest.builder()
                .tableName("cities")
                .item(Map.of(
                        "Id", AttributeValue.builder().s("1").build(),
                        "City", AttributeValue.builder().s("New Delhi").build()
                ))
                .build());

        ddb.putItem(PutItemRequest.builder()
                .tableName("cities")
                .item(Map.of(
                        "Id", AttributeValue.builder().s("2").build(),
                        "City", AttributeValue.builder().s("Bangalore").build()
                ))
                .build());

        ddb.createTable(CreateTableRequest.builder()
                .tableName("allTypes")
                .attributeDefinitions(
                        AttributeDefinition.builder().attributeName("Id").attributeType(ScalarAttributeType.N).build()
                )
                .keySchema(
                        KeySchemaElement.builder().attributeName("Id").keyType(KeyType.HASH).build()
                )
                .provisionedThroughput(
                        ProvisionedThroughput.builder().readCapacityUnits(5L).writeCapacityUnits(5L).build()
                )
                .build());

        String testPayload1 = "payload1";
        SdkBytes bytesValue1 = SdkBytes.fromByteArray(testPayload1.getBytes());
        String testPayload2 = "payload2";
        SdkBytes bytesValue2 = SdkBytes.fromByteArray(testPayload2.getBytes());
        AttributeValue mapValue = AttributeValue.builder().s("mapValue").build();
        AttributeValue listValue1 = AttributeValue.builder().s("listValue1").build();
        AttributeValue listValue2 = AttributeValue.builder().s("listValue2").build();
        ddb.putItem(PutItemRequest.builder()
                .tableName("allTypes")
                .item(Map.of(
                        "Id", AttributeValue.builder().n("1").build(),
                        "StringType", AttributeValue.builder().s("str").build(),
                        "BooleanType", AttributeValue.builder().bool(true).build(),
                        "BinaryType", AttributeValue.builder().b(bytesValue1).build(),
                        "NullType", AttributeValue.builder().nul(true).build(),
                        "StringSetType", AttributeValue.builder().ss("str1", "str2").build(),
                        "NumberSetType", AttributeValue.builder().ns("1", "2").build(),
                        "BinarySetType", AttributeValue.builder().bs(bytesValue1, bytesValue2).build(),
                        "MapType", AttributeValue.builder().m(Map.of("mapKey", mapValue)).build(),
                        "ListType", AttributeValue.builder().l(listValue1, listValue2).build()
                ))
                .build());

        Endpoint endpoint = new Endpoint();
        endpoint.setHost(host);
        endpoint.setPort(port.longValue());
        DBAuth auth = new DBAuth();
        auth.setUsername("dummy");
        auth.setPassword("dummy");
        auth.setDatabaseName(Region.AP_SOUTH_1.toString());
        dsConfig.setAuthentication(auth);
        dsConfig.setEndpoints(List.of(endpoint));
    }

    private Mono<ActionExecutionResult> execute(String action, String jsonActionConfiguration) {
        ActionConfiguration actionConfiguration = new ActionConfiguration();
        actionConfiguration.setPath(action);
        actionConfiguration.setBody(jsonActionConfiguration);

        return pluginExecutor
                .datasourceCreate(dsConfig)
                .flatMap(conn -> pluginExecutor.execute(conn, dsConfig, actionConfiguration));
    }

    @Test
    public void testListTables() {
        StepVerifier.create(execute("ListTables", null))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());
                    assertArrayEquals(
                            new String[]{"cities"},
                            ((Map<String, List<String>>) result.getBody()).get("TableNames").toArray()
                    );
                })
                .verifyComplete();
    }

    @Test
    public void testDescribeTable() {
        final String body = "{\n" +
                "  \"TableName\": \"cities\"\n" +
                "}\n";

        StepVerifier.create(execute("DescribeTable", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());
                    final Map<String, Object> table =  ((Map<String, Map<String, Object>>) result.getBody()).get("Table");
                    assertEquals("cities", table.get("TableName"));
                })
                .verifyComplete();
    }

    @Test
    public void testGetItem() {
        final String body = "{\n" +
                "  \"TableName\": \"cities\",\n" +
                "  \"Key\": {\n" +
                "    \"Id\": {\n" +
                "      \"S\": \"1\"\n" +
                "    }\n" +
                "  }\n" +
                "}\n";

        StepVerifier.create(execute("GetItem", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());
                    Map<String, Object> resultBody = (Map<String, Object>) result.getBody();
                    Map<String, Object> rawResponse = (Map<String, Object>) resultBody.get("raw");
                    Map<String, Map<String, String>> rawItem = (Map<String, Map<String, String>>) rawResponse.get("Item");
                    assertEquals("New Delhi", rawItem.get("City").get("S"));

                    Map<String, String> transformedItem = (Map<String, String>) resultBody.get("Item");
                    assertEquals("New Delhi", transformedItem.get("City"));
                })
                .verifyComplete();
    }

    @Test
    public void testPutItem() {
        final String body = "{\n" +
                "  \"TableName\": \"cities\",\n" +
                "  \"Item\": {\n" +
                "    \"Id\": {\n" +
                "      \"S\": \"9\"\n" +
                "    },\n" +
                "    \"City\": {\n" +
                "      \"S\": \"Mumbai\"\n" +
                "    }\n" +
                "  }\n" +
                "}\n";

        StepVerifier.create(execute("PutItem", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());
                    assertNotNull(((Map<String, List<String>>) result.getBody()).get("Attributes"));
                })
                .verifyComplete();
    }

    @Test
    public void testUpdateItem() {
        final String body = "{\n" +
                "  \"TableName\": \"cities\",\n" +
                "  \"Key\": {\n" +
                "    \"Id\": {\n" +
                "      \"S\": \"2\"\n" +
                "    }\n" +
                "  },\n" +
                "  \"UpdateExpression\": \"set City = :new_city\",\n" +
                "  \"ExpressionAttributeValues\": {\n" +
                "    \":new_city\": {\n" +
                "      \"S\": \"Bengaluru\"\n" +
                "    }\n" +
                "  },\n" +
                "  \"ReturnValues\": \"ALL_NEW\"\n" +
                "}\n";

        StepVerifier.create(execute("UpdateItem", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());
                    Map<String, Object> resultBody = (Map<String, Object>) result.getBody();
                    Map<String, Object> rawResponse = (Map<String, Object>) resultBody.get("raw");
                    Map<String, Map<String, Object>> rawItem = (Map<String, Map<String, Object>>) rawResponse.get(
                            "Attributes");
                    assertEquals("Bengaluru", rawItem.get("City").get("S"));

                    Map<String, String> transformedItem = (Map<String, String>) resultBody.get("Attributes");
                    assertEquals("Bengaluru", transformedItem.get("City"));
                })
                .verifyComplete();
    }

    @Test
    public void testScan() {
        final String body = "{\n" +
                "  \"TableName\": \"cities\"\n" +
                "}\n";

        StepVerifier.create(execute("Scan", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());

                    List<Map<String, Object>> items = (List<Map<String, Object>>)
                            ((Map<String, Object>)((Map<String, Object>) result.getBody()).get("raw")).get("Items");
                    assertEquals(2, items.size());

                    for (int i=0; i<items.size(); i++) {
                        Map<String, Object> item = items.get(i);
                        for (Map.Entry<String, Object> entry: item.entrySet()) {
                            Object rawValue = ((Map<String, Object>) entry.getValue()).get("S");
                            Object transformedValue =
                                    ((List<Map<String, Object>>)((Map<String, Object>) result.getBody()).get("Items"))
                                            .get(i).get(entry.getKey());
                            assertTrue(rawValue.equals(transformedValue));
                        }
                    }
                })
                .verifyComplete();
    }

    @Test
    public void testStructure() {
        final Mono<DatasourceStructure> structureMono = pluginExecutor
                .datasourceCreate(dsConfig)
                .flatMap(conn -> pluginExecutor.getStructure(conn, dsConfig));

        StepVerifier.create(structureMono)
                .assertNext(structure -> {
                    assertNotNull(structure);
                    assertNotNull(structure.getTables());
                    assertEquals(
                            List.of("cities"),
                            structure.getTables().stream()
                                    .map(DatasourceStructure.Table::getName)
                                    .collect(Collectors.toList())
                    );
                })
                .verifyComplete();
    }

    @Test
    public void testParsingCapabilityForAllTypes() {
        final String body = "{\n" +
                "  \"TableName\": \"allTypes\"\n" +
                "}\n";

        StepVerifier.create(execute("Scan", body))
                .assertNext(result -> {
                    assertNotNull(result);
                    assertTrue(result.getIsExecutionSuccess());
                    assertNotNull(result.getBody());

                    Map<String, Object> resultBody = (Map<String, Object>) result.getBody();
                    Map<String, Object> rawResponse = (Map<String, Object>) resultBody.get("raw");
                    ArrayList<Map<String, Object>> rawItems = (ArrayList<Map<String, Object>>) rawResponse.get(
                            "Items");
                    Map<String, Object> rawItemMap = rawItems.get(0);
                    assertEquals("1", ((Map<String, Object>)rawItemMap.get("Id")).get("N"));
                    assertEquals("str", ((Map<String, Object>)rawItemMap.get("StringType")).get("S"));
                    assertEquals("true", ((Map<String, Object>)rawItemMap.get("BooleanType")).get("BOOL").toString());
                    assertEquals("payload1", ((Map<String, Object>)rawItemMap.get("BinaryType")).get("B"));
                    assertEquals("true", ((Map<String, Object>)rawItemMap.get("NullType")).get("NUL").toString());
                    assertArrayEquals(new String[]{"str1", "str2"},
                            ((ArrayList<String>)((Map<String, Object>)rawItemMap.get("StringSetType")).get("SS")).toArray());
                    assertArrayEquals(new String[]{"payload1", "payload2"},
                            ((ArrayList<String>)((Map<String, Object>)rawItemMap.get("BinarySetType")).get("BS")).toArray());
                    assertArrayEquals(new String[]{"1", "2"},
                            ((ArrayList<String>)((Map<String, Object>)rawItemMap.get("NumberSetType")).get("NS")).toArray());
                    assertEquals("mapValue",
                            ((Map<String, Map<String, Map<String, Object>>>)rawItemMap.get("MapType")).get("M")
                                    .get("mapKey").get("S").toString());
                    assertEquals("listValue1",
                            ((HashMap<String, ArrayList<HashMap<String, Object>>>)rawItemMap.get("ListType")).get("L").get(0).get("S"));
                    assertEquals("listValue2",
                            ((HashMap<String, ArrayList<HashMap<String, Object>>>)rawItemMap.get("ListType")).get("L").get(1).get("S"));

                    ArrayList<Map<String, Object>> transformedItems = (ArrayList<Map<String, Object>>) resultBody.get("Items");
                    Map<String, Object> transformedItemMap = transformedItems.get(0);
                    assertEquals("1", transformedItemMap.get("Id"));
                    assertEquals("str", transformedItemMap.get("StringType"));
                    assertEquals("true", transformedItemMap.get("BooleanType").toString());
                    assertEquals("payload1", transformedItemMap.get("BinaryType"));
                    assertEquals("true", transformedItemMap.get("NullType").toString());
                    assertArrayEquals(new String[]{"str1", "str2"},
                            ((ArrayList<String>)transformedItemMap.get("StringSetType")).toArray());
                    assertArrayEquals(new String[]{"payload1", "payload2"},
                            ((ArrayList<String>)transformedItemMap.get("BinarySetType")).toArray());
                    assertArrayEquals(new String[]{"1", "2"},
                            ((ArrayList<String>)transformedItemMap.get("NumberSetType")).toArray());
                    assertEquals("mapValue",
                            ((Map<String, Object>)transformedItemMap.get("MapType")).get("mapKey").toString());
                    assertEquals("listValue1", ((ArrayList<String>)transformedItemMap.get("ListType")).get(0));
                    assertEquals("listValue2", ((ArrayList<String>)transformedItemMap.get("ListType")).get(1));
                })
                .verifyComplete();
    }
}
