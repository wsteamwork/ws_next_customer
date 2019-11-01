import { Fragment, FC, useState } from 'react';
import { ReducersList } from '@/store/Redux/Reducers';
import { ProfileInfoRes } from '@/types/Requests/Profile/ProfileResponse';
import { useSelector } from 'react-redux';
import { axios } from '@/utils/axiosInstance';
import UppyImageID from './UppyImageID';
import { Typography } from '@material-ui/core';

const VerifyID: FC = (props) => {
  //   const { t } = useTranslation();

  const profile = useSelector<ReducersList, ProfileInfoRes>((state) => state.iProfile.profile);

  //   const [email, setEmail] = useState<string>(null);

  //   const verifyEmail = () => {
  //     axios
  //       .get(`verify-email`)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <Fragment>
      {profile.verify.identity_verify ? (
        <Fragment>
          <Typography>Đã cung cấp</Typography>
        </Fragment>
      ) : (
        <UppyImageID />
      )}
    </Fragment>
  );
};

export default VerifyID;
