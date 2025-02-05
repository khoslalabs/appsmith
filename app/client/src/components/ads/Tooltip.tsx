import React from "react";
import { CommonComponentProps } from "./common";
import { Position, Tooltip, PopperBoundary } from "@blueprintjs/core";
import { GLOBAL_STYLE_TOOLTIP_CLASSNAME } from "globalStyles/tooltip";

type Variant = "dark" | "light";

type TooltipProps = CommonComponentProps & {
  content: JSX.Element | string;
  position?: Position;
  children: JSX.Element | React.ReactNode;
  variant?: Variant;
  maxWidth?: string;
  boundary?: PopperBoundary;
  minWidth?: string;
  openOnTargetFocus?: boolean;
  autoFocus?: boolean;
  hoverOpenDelay?: number;
  minimal?: boolean;
  isOpen?: boolean;
};

const portalContainer = document.getElementById("tooltip-root");

function TooltipComponent(props: TooltipProps) {
  return (
    <Tooltip
      autoFocus={props.autoFocus}
      boundary={props.boundary || "scrollParent"}
      content={props.content}
      hoverOpenDelay={props.hoverOpenDelay}
      isOpen={props.isOpen}
      minimal={props.minimal}
      modifiers={{
        preventOverflow: { enabled: false },
      }}
      openOnTargetFocus={props.openOnTargetFocus}
      popoverClassName={GLOBAL_STYLE_TOOLTIP_CLASSNAME}
      portalContainer={portalContainer as HTMLDivElement}
      position={props.position}
      usePortal
    >
      {props.children}
    </Tooltip>
  );
}

TooltipComponent.defaultProps = {
  position: Position.TOP,
  variant: "dark",
};

export default TooltipComponent;
