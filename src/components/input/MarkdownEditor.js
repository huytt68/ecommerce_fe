import React, {  memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkdownEditor=({label, value, changeValue, name, invalidFields, setInvalidFields, setIsFocusDescription}) => {
  
  return (
    <div className = 'flex flex-col'>
        <span className=''>{label}</span>
      <Editor
        apiKey='2owc5crxhvne3ntz2bb8js9l4q5q3x9nifsbn4xmaxo5mb5i'
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()}))}
        onFocus={() => {
          setInvalidFields && setInvalidFields([])
        }}
        
      />
      {invalidFields?.some(el => el.name === name) && <small className='text-main text-sm'>{invalidFields?.find(el => el.name === name)?.mes}</small>}
    </div>
  );
}

export default memo(MarkdownEditor)