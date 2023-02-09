import { useState } from "react";
import { uploadFile, deleteFile } from "@/utils/file-functions";

type Props = {
	withImageTransformData: (
		data: any,
		imageResponse: any,
		finalValue: any
	) => {
		[key: string]: unknown;
	};
	withoutImageTransformData: (
		data: any,
		finalValue: any
	) => {
		[key: string]: unknown;
	};
};

const useAdminTransform = ({
	withImageTransformData,
	withoutImageTransformData,
}: Props) => {
	const [logo, setLogo] = useState<any>(null);
	const [oldLogo, setOldLogo] = useState<any>(null);
	const [isImageUpdated, setIsImageUpdated] = useState<boolean>(false);

	const transform = async (data: any) => {
		let formData = { ...data };
		const tagValue = formData.tags ? formData.tags : [];
		const finalValue =
			typeof tagValue === "string" ? tagValue.split(",") : tagValue;

		if (
      !formData?.location_json?.address &&
      !formData?.location_json?.city &&
      !formData?.location_json?.state &&
      !formData?.location_json?.country &&
      formData?.geopoint
    ) {
      formData.geopoint = null;
    }

		if (oldLogo) {
			//delete old file from s3
			deleteFile(oldLogo);
		}

		if (logo) {
			const res = await uploadFile(logo);
			return withImageTransformData(formData, res, finalValue);
		} else {
			return withoutImageTransformData(formData, finalValue);
		}
	};

	const onSelect = (files: any) => {
		if (files && files.length > 0) {
			setLogo(files[0]);
		} else {
			setLogo(null);
		}
	};

	const onDropRejected = (files: any) => {
		if (files.id) {
			setOldLogo(files);
		}
		setIsImageUpdated(true);
		setLogo(null);
	};

	return {
		isImageUpdated,
		logo,
		transform,
		onSelect,
		onDropRejected,
	};
};

export default useAdminTransform;
