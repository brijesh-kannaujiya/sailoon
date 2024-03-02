import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import style from "../cms/cms.module.css"

const RichTextEditorComponent = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(value, 'html')
  );

  const handleEditorChange = (newValue) => {
    setEditorValue(newValue);
    onChange(newValue.toString('html'));
  };

  return (
    <RichTextEditor
      value={editorValue}
      onChange={handleEditorChange}
      className={style.customrichtexteditor} 
    />
  );
};

export default RichTextEditorComponent;
