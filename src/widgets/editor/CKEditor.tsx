import { useRef } from "react";
import { Field } from "formik";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CkEditor({ handleChange, name }: any) {
  const editorRef: any = useRef(null);

  return (
    <Field name={name}>
      {({ field }: any) => (
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={field.value}
            onReady={(editor) => {
              // Store the editor instance in the ref
              editorRef.current = editor;
            }}
            onChange={(event, editor) => {
              // Call the handleChange function with the updated value
              const data = editor.getData();
              handleChange({ target: { name: field.name, value: data } });
            }}
            // onBlur={(event, editor) => {
            //   console.log('Blur.', editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log('Focus.', editor);
            // }}
          />
        </div>
      )}
    </Field>
  );
}
