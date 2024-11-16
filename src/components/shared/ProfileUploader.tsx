import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]); // new img
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl); // already img / selected img

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
