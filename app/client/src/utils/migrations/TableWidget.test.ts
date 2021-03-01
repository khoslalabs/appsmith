import { WidgetProps } from "widgets/BaseWidget";
import { ContainerWidgetProps } from "widgets/ContainerWidget";
import { tableWidgetPropertyPaneMigrations } from "./TableWidget";

const input1: ContainerWidgetProps<WidgetProps> = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table1",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 19,
      bottomRow: 26,
      parentId: "0",
      widgetId: "fs785w9gcy",
      dynamicBindingPathList: [],
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

const input2: ContainerWidgetProps<WidgetProps> = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table2",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 28,
      bottomRow: 35,
      parentId: "0",
      widgetId: "l9i1e8ybkm",
      dynamicBindingPathList: [],
      dynamicTriggerPathList: [{ key: "columnActions" }],
      columnActions: [
        {
          label: "Test",
          id: "ezooq966rd",
          actionPayloads: [],
          dynamicTrigger: "{{showAlert('test','success')}}",
        },
        {
          label: "Fail",
          id: "1k8nkay5r6",
          actionPayloads: [],
          dynamicTrigger: "{{showAlert('Fail','error')}}",
        },
      ],
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

const input3: ContainerWidgetProps<WidgetProps> = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table3",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 37,
      bottomRow: 44,
      parentId: "0",
      widgetId: "8mkidz550s",
      dynamicBindingPathList: [],
      dynamicTriggerPathList: [
        { key: "onRowSelected" },
        { key: "onSearchTextChanged" },
      ],
      onRowSelected: "{{showAlert('test','success')}}",
      onSearchTextChanged: "{{showAlert('fail','error')}}",
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

const output1 = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table1",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 19,
      bottomRow: 26,
      parentId: "0",
      widgetId: "fs785w9gcy",
      dynamicBindingPathList: [],
      primaryColumns: {
        id: {
          index: 0,
          width: 150,
          id: "id",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "id",
          computedValue: "",
        },
        email: {
          index: 1,
          width: 150,
          id: "email",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "email",
          computedValue: "",
        },
        userName: {
          index: 2,
          width: 150,
          id: "userName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "userName",
          computedValue: "",
        },
        productName: {
          index: 3,
          width: 150,
          id: "productName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "productName",
          computedValue: "",
        },
        orderAmount: {
          index: 4,
          width: 150,
          id: "orderAmount",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "orderAmount",
          computedValue: "",
        },
      },
      textSize: "PARAGRAPH",
      horizontalAlignment: "LEFT",
      verticalAlignment: "CENTER",
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

const output2 = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table2",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 28,
      bottomRow: 35,
      parentId: "0",
      widgetId: "l9i1e8ybkm",
      dynamicBindingPathList: [],
      dynamicTriggerPathList: [
        { key: "columnActions" },
        { key: "primaryColumns.customColumn1.onClick" },
        { key: "primaryColumns.customColumn2.onClick" },
      ],
      columnActions: [
        {
          label: "Test",
          id: "ezooq966rd",
          actionPayloads: [],
          dynamicTrigger: "{{showAlert('test','success')}}",
        },
        {
          label: "Fail",
          id: "1k8nkay5r6",
          actionPayloads: [],
          dynamicTrigger: "{{showAlert('Fail','error')}}",
        },
      ],
      primaryColumns: {
        id: {
          index: 0,
          width: 150,
          id: "id",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "id",
          computedValue: "",
        },
        email: {
          index: 1,
          width: 150,
          id: "email",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "email",
          computedValue: "",
        },
        userName: {
          index: 2,
          width: 150,
          id: "userName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "userName",
          computedValue: "",
        },
        productName: {
          index: 3,
          width: 150,
          id: "productName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "productName",
          computedValue: "",
        },
        orderAmount: {
          index: 4,
          width: 150,
          id: "orderAmount",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "orderAmount",
          computedValue: "",
        },
        customColumn1: {
          index: 5,
          width: 150,
          id: "ezooq966rd",
          label: "Test",
          columnType: "button",
          isVisible: true,
          isDerived: true,
          buttonLabel: "Test",
          buttonStyle: "#29CCA3",
          buttonLabelColor: "#FFFFFF",
          onClick: "{{showAlert('test','success')}}",
        },
        customColumn2: {
          index: 6,
          width: 150,
          id: "1k8nkay5r6",
          label: "Fail",
          columnType: "button",
          isVisible: true,
          isDerived: true,
          buttonLabel: "Fail",
          buttonStyle: "#29CCA3",
          buttonLabelColor: "#FFFFFF",
          onClick: "{{showAlert('Fail','error')}}",
        },
      },
      textSize: "PARAGRAPH",
      horizontalAlignment: "LEFT",
      verticalAlignment: "CENTER",
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

const output3 = {
  widgetName: "MainContainer",
  backgroundColor: "none",
  rightColumn: 1224,
  snapColumns: 16,
  detachFromLayout: true,
  widgetId: "0",
  topRow: 0,
  bottomRow: 1840,
  containerStyle: "none",
  snapRows: 33,
  parentRowSpace: 1,
  type: "CANVAS_WIDGET",
  canExtend: true,
  version: 7,
  minHeight: 1292,
  parentColumnSpace: 1,
  dynamicBindingPathList: [],
  leftColumn: 0,
  isLoading: false,
  parentId: "",
  renderMode: "CANVAS",
  children: [
    {
      isVisible: true,
      label: "Data",
      widgetName: "Table3",
      searchKey: "",
      tableData:
        '[\n  {\n    "id": 2381224,\n    "email": "michael.lawson@reqres.in",\n    "userName": "Michael Lawson",\n    "productName": "Chicken Sandwich",\n    "orderAmount": 4.99\n  },\n  {\n    "id": 2736212,\n    "email": "lindsay.ferguson@reqres.in",\n    "userName": "Lindsay Ferguson",\n    "productName": "Tuna Salad",\n    "orderAmount": 9.99\n  },\n  {\n    "id": 6788734,\n    "email": "tobias.funke@reqres.in",\n    "userName": "Tobias Funke",\n    "productName": "Beef steak",\n    "orderAmount": 19.99\n  }\n]',
      type: "TABLE_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 0,
      rightColumn: 8,
      topRow: 37,
      bottomRow: 44,
      parentId: "0",
      widgetId: "8mkidz550s",
      dynamicBindingPathList: [],
      dynamicTriggerPathList: [
        { key: "onRowSelected" },
        { key: "onSearchTextChanged" },
      ],
      onRowSelected: "{{showAlert('test','success')}}",
      onSearchTextChanged: "{{showAlert('fail','error')}}",
      primaryColumns: {
        id: {
          index: 0,
          width: 150,
          id: "id",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "id",
          computedValue: "",
        },
        email: {
          index: 1,
          width: 150,
          id: "email",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "email",
          computedValue: "",
        },
        userName: {
          index: 2,
          width: 150,
          id: "userName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "userName",
          computedValue: "",
        },
        productName: {
          index: 3,
          width: 150,
          id: "productName",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "productName",
          computedValue: "",
        },
        orderAmount: {
          index: 4,
          width: 150,
          id: "orderAmount",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textColor: "#231F20",
          textSize: "PARAGRAPH",
          fontStyle: "REGULAR",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "orderAmount",
          computedValue: "",
        },
      },
      textSize: "PARAGRAPH",
      horizontalAlignment: "LEFT",
      verticalAlignment: "CENTER",
      renderMode: "CANVAS",
      version: 1,
    },
  ],
};

describe("Table Widget Property Pane Upgrade", () => {
  it("To test primaryColumns are created for a simple table", () => {
    const newDsl = tableWidgetPropertyPaneMigrations(input1);
    expect(JSON.stringify(newDsl) === JSON.stringify(output1));
  });
  it("To test columnActions are migrated derived primaryColumns", () => {
    const newDsl = tableWidgetPropertyPaneMigrations(input2);
    expect(JSON.stringify(newDsl) === JSON.stringify(output2));
  });
  it("To test table action are migrated", () => {
    const newDsl = tableWidgetPropertyPaneMigrations(input3);
    expect(JSON.stringify(newDsl) === JSON.stringify(output3));
  });
});
