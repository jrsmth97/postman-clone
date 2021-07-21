import { EditorState, basicSetup } from "./node_modules/@codemirror/basic-setup/dist/index.js";
import { defaultTabBinding } from "./node_modules/@codemirror/commands/dist/index.js";
import { EditorView, keymap } from "./node_modules/@codemirror/view/dist/index.js";
import { json } from "./node_modules/@codemirror/lang-json/dist/index.js";

export default function setupEditors() {
  const jsonRequestBody = document.querySelector("[data-json-request-body]");
  const jsonResponseBody = document.querySelector("[data-json-response-body]");

  const basicExtensions = [
    basicSetup,
    keymap.of([defaultTabBinding]),
    json(),
    EditorState.tabSize.of(2),
  ];

  const requestEditor = new EditorView({
    state: EditorState.create({
      doc: "{\n\t\n}",
      extensions: basicExtensions,
    }),
    parent: jsonRequestBody,
  });

  const responseEditor = new EditorView({
    state: EditorState.create({
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],
    }),
    parent: jsonResponseBody,
  });

  function updateResponseEditor(value) {
    responseEditor.dispatch({
      changes: {
        from: 0,
        to: responseEditor.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }

  return { requestEditor, updateResponseEditor };
}
