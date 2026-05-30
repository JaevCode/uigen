import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";

interface ToolCallBadgeProps {
  toolInvocation: ToolInvocation;
}

function getLabel(toolName: string, args: Record<string, unknown>): string {
  const path = typeof args.path === "string" ? args.path : "";
  const command = args.command;

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create": return `Creating ${path}`;
      case "str_replace": return `Editing ${path}`;
      case "insert": return `Inserting into ${path}`;
      case "view": return `Viewing ${path}`;
      case "undo_edit": return `Undoing edit on ${path}`;
    }
  }

  if (toolName === "file_manager") {
    switch (command) {
      case "rename": return `Renaming ${path}`;
      case "delete": return `Deleting ${path}`;
    }
  }

  return toolName;
}

export function ToolCallBadge({ toolInvocation }: ToolCallBadgeProps) {
  const label = getLabel(toolInvocation.toolName, toolInvocation.args as Record<string, unknown>);
  const isDone = toolInvocation.state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
