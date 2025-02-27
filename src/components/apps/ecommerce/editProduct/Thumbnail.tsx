import { Icon } from '@iconify/react/dist/iconify.js';
import { FileInput, Label } from 'flowbite-react';
import React from 'react';
import CardBox from 'src/components/shared/CardBox';

interface ThumbnailProps {
  onBannerChange: (file: File) => void;
  setBanner: (url: string) => void;
  banner: string | null;
}

const Thumbnail = ({ onBannerChange, setBanner, banner }: any) => {
  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setBanner(URL.createObjectURL(file)); // Preview image
      onBannerChange(file); // Send actual file
    }
  };

  return (
    <div>
      <CardBox>
        <h5 className="card-title mb-4 m">Event Banner</h5>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="banner-file"
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-primary bg-lightprimary"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Icon
                icon="solar:cloud-upload-outline"
                height={32}
                className="mb-3 text-darklink dark:text-bodytext"
              />
              <p className="mb-2 text-sm text-darklink dark:text-bodytext">
                Drop Banner here to upload
              </p>
            </div>
            <input
              id="banner-file"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
            />
          </Label>
        </div>
        {banner && (
          <img
            src={banner}
            alt="Banner Preview"
            className="mt-3 h-48 w-full object-cover rounded-lg"
          />
        )}

        <small className="text-xs text-darklink dark:text-bodytext text-center">
          Set the product thumbnail and banner image. Only *.png, *.jpg, and *.jpeg image files are
          accepted.
        </small>
      </CardBox>
    </div>
  );
};

export default Thumbnail;
