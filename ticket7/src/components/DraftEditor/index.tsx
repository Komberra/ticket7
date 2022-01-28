import React from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import "draft-js/dist/Draft.css";

import getWords from "../../helpers/getWords";

import * as S from "./styles";

const Decorated = ({ children }) => {
  return (
    <span style={{ textDecoration: "underline", textDecorationColor: "red" }}>
      {children}
    </span>
  );
};

async function findWithRegex(words, contentBlock, callback) {
  const text = contentBlock.getText();

  words.forEach((word) => {
    const matches = [...text.matchAll(word.old)];
    matches.forEach((match) =>
      callback(match.index, match.index + match[0].length)
    );
  });
}

export default function () {
  const editor = React.useRef(null);
  const [words, setWords] = React.useState([]);
  const check = false;

  const compositeDecorator = React.useMemo(
    () =>
      new CompositeDecorator([
        {
          strategy: (contentBlock, callback) => {
            findWithRegex(words, contentBlock, callback);
          },
          component: Decorated
        }
      ]),
    [words]
  );

  const [state, setState] = React.useState(
    EditorState.createEmpty(compositeDecorator)
  );

  const currentPlainText = state.getCurrentContent().getPlainText();

  React.useEffect(() => {
    (async () => {
      const tipWords = await getWords(currentPlainText);
      setWords(tipWords);
    })();
  }, [currentPlainText]);

  const handleButton = (editorState) => {
    this.check = true;
  };

  const handleChange = (editorState) => {
    const contentStateWithEntity = editorState.getCurrentContent();
    return setState(
      EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
        decorator: this.check ? compositeDecorator : null
      })
    );
  };

  return (
    <S.Container>
      <Editor
        ref={editor}
        placeholder={"Введите слово"}
        editorState={state}
        onChange={handleChange}
        spellCheck={false}
      />
      <button onClick={handleButton}>Проверить</button>
    </S.Container>
  );
}
