import { useState } from "react";
import { uploadFile, deleteFile } from "@/utils/file-functions";

type Props = {
	withImageTransformData: (
		data: any,
		imageResponse: any,
		finalValue: any,
		attachmentsResponse?: any,
	) => {
		[key: string]: unknown;
	};
	withoutImageTransformData: (
		data: any,
		finalValue: any,
		attachmentsResponse?: any,
	) => {
		[key: string]: unknown;
	};
	hasGeopoint?: boolean 
	hasAdditionalAttachments?: boolean;
};

const useAdminTransform = ({
	withImageTransformData,
	withoutImageTransformData,
	hasGeopoint,
	hasAdditionalAttachments = false,
}: Props) => {
	const [logo, setLogo] = useState<any>(null);
	const [oldLogo, setOldLogo] = useState<any>(null);
	const [isImageUpdated, setIsImageUpdated] = useState<boolean>(false);
	const [attachments, setAttachments] = useState<any>([]);

	const transform = async (data: any) => {
		let formData = { ...data };
		const tagValue = formData.tags ? formData.tags : [];
		const finalValue =
			typeof tagValue === "string" ? tagValue.split(",") : tagValue;

		if (
      (!formData?.location_json?.address &&
      !formData?.location_json?.city &&
      !formData?.location_json?.state &&
      !formData?.location_json?.country &&
      formData?.geopoint) || (!formData?.geopoint && hasGeopoint)
    ) {
      formData.geopoint = null;
    }

		if (oldLogo) {
			//delete old file from s3
			deleteFile(oldLogo);
		}

		let attachmentsResponse = null;
		if (attachments.length > 0) {
			attachmentsResponse = await Promise.all(
				attachments.map(async (file: any) => {
					const res = await uploadFile(file);
					return {
						...res,
						fileName: file.name,
					}
				})
			);
		}
console.log('@attachments', {attachments, attachmentsResponse})
		if (logo) {
			const res = await uploadFile(logo);
			return withImageTransformData(formData, res, finalValue, attachmentsResponse);
		} else {
			return withoutImageTransformData(formData, finalValue, attachmentsResponse);
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

	const onSelectAttachment = (files: any) => {
		console.log('@files', files)
		if (files && files.length > 0) {
			setAttachments([...attachments, files[0]]);
		}
	};

	// const onDropRejectedAttachment = (files: any) => {
	// 	if (files.id) {
	// 		setOldLogo(files);
	// 	}
	// 	setIsImageUpdated(true);
	// 	setLogo(null);
	// };

	return {
		isImageUpdated,
		logo,
		transform,
		onSelect,
		onDropRejected,
		onSelectAttachment,
	};
};

export default useAdminTransform;
