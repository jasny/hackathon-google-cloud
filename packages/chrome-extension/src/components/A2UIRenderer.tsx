import React from "react"
import { DataRequestItem } from "./DataRequestItem"
import { NestedDataRequestItem } from "./NestedDataRequestItem"

export interface A2UIComponent {
  id: string
  type: string
  props?: any
  children?: string[]
}

interface A2UIRendererProps {
  components: A2UIComponent[]
  onAction: (id: string, action: string, payload?: any) => void
}

export const A2UIRenderer = ({ components, onAction }: A2UIRendererProps) => {
  const componentMap = new Map(components.map(c => [c.id, c]))

  const renderComponent = (id: string): React.ReactNode => {
    const component = componentMap.get(id)
    if (!component) return null

    switch (component.type) {
      case "Container":
        return (
          <div key={id} className="space-y-3">
            {component.children?.map(childId => renderComponent(childId))}
          </div>
        )
      case "SectionHeader":
        return (
          <h3 key={id} className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            {component.props.text}
          </h3>
        )
      case "DataRequestItem":
        return (
          <DataRequestItem
            key={id}
            label={component.props.label}
            description={component.props.description}
            state={component.props.state}
            onStateChange={(state) => onAction(id, "toggle", { state })}
          />
        )
      case "NestedDataRequestItem":
        return (
          <NestedDataRequestItem
            key={id}
            label={component.props.label}
            items={component.props.items}
            onItemToggle={(itemId) => onAction(id, "toggleItem", { itemId })}
            onToggleAll={(checked) => onAction(id, "toggleAll", { checked })}
            footerText={component.props.footerText}
            open={component.props.open}
          />
        )
      default:
        return null
    }
  }

  // Assuming the first component or one with id 'root' is the entry point
  const rootId = components[0]?.id
  if (!rootId) return null

  return <>{renderComponent(rootId)}</>
}
