'use client';
import { upload } from '@/actions/upload';
import { uploadFileToS3 } from '@/lib/client/s3';
import s from './UploadFileForm.module.scss';

export default function UploadFileForm() {
  async function onSubmit(e) {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    // const image = e.target.files[0];
    // return <Overlay />
    if (!file) return alert('Select a file first');

    const { key } = await uploadFileToS3(file);
    await upload(key);
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      {/* <input type="file" name="image" id="image" accept="image/*"></input>
      <label htmlFor="image">Choose image</label> */}

      <input className={s.form__fileInput} type="file" name="file" id="file"></input>
      <label className={s.form__fileLabel} htmlFor="file">
        Choose csv file
      </label>

      <input className={s.form__textInput} type="text" name="text" placeholder="comments"></input>
      <button className={s.form__btn} type="submit">
        Send
      </button>
    </form>
  );
}
