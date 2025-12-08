export default function MessageBubble({ msg }: any) {
  if (msg.role === "user")
    return (
      <div className="text-right mb-2">
        <span className="inline-block bg-blue-500 text-white px-3 py-2 rounded-lg">
          {msg.content}
        </span>
      </div>
    );

  if (msg.role === "assistant")
    return (
      <div className="text-left mb-2">
        <span className="inline-block bg-gray-200 px-3 py-2 rounded-lg">
          {msg.content}
        </span>
      </div>
    );

  if (msg.role === "tool_call")
    return (
      <div className="text-left text-sm mb-2">
        🛠 <strong>{msg.tool}</strong> → args:{" "}
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(msg.args)}</pre>
      </div>
    );

  if (msg.role === "tool_result")
    return (
      <div className="text-left text-sm mb-2">
        📦 <strong>{msg.tool}</strong> result:
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(msg.result)}
        </pre>
      </div>
    );

  return null;
}
