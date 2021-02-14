import React, { useState } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!",
              },
            ],
          },
        ],
      },
    ],
  },
});

const Slate2 = () => {
  const [value, setValue] = useState(initialValue);
  return <Editor value={value} onChange={(opts) => setValue(opts.value)} />;
};
