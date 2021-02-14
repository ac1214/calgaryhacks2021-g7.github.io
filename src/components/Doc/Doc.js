import React, { useEffect, useMemo, useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { patch } from "jsondiffpatch";
import debounce from "debounce";
// import { Editor } from "react-draft-wysiwyg";

const Doc = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    props.socket.on("new-remote-operations", (event) => {
      const { delta } = JSON.parse(event);
      handleMessage(delta);
    });
    //unsubscribe to event
    return () => {
      props.socket.removeListener("new-remote-operations");
    };
  }, []);

  const handleMessage = (delta) => {
    if (!delta) return;
    let raw = convertToRaw(editorState.getCurrentContent());
    let nextContextState = convertFromRaw(patch(raw, delta));
    let newState = EditorState.push(editorState, nextContextState);
    setEditorState(EditorState.moveFocusToEnd(newState));
  };

  const broadcast = debounce((newState) => {
    props.socket.emit(
      "new-operations",
      JSON.stringify({
        raw: convertToRaw(newState.getCurrentContent()),
      })
    );
  }, 10);

  const onChange = (newState) => {
    broadcast(newState);
    setEditorState(newState);
  };

  return (
    //TODO: would be nice to use wyzyg
    <Editor
      editorState={editorState}
      onChange={onChange}
      // onEditorStateChange={onChange}
      placeholder="Type here..."
      // onEditorStateChange={onChange}
      // toolbar={{
      //   inline: { inDropdown: true },
      //   list: { inDropdown: true },
      //   textAlign: { inDropdown: true },
      //   link: { inDropdown: true },
      // }}
    />
  );
};

export default Doc;
