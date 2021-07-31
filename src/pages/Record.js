import React from 'react';
import { Button, Grid, Text } from '../elements';
import styled from 'styled-components';
//컴포넌트
import BtnHeader from '../shared/BtnHeader';
import Record_Date from '../components/Record_Date';
import Record_When from '../components/Record_When';
import Record_List from '../components/Record_List';
import theme from '../shared/theme';
//이모지
import { BiCamera } from "react-icons/bi";

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : 카트에 담은 칼로리 리스트를 본격적으로 기록하러 갈 수 있는 페이지
 * @담당자 : 김나영
*/

const Record = (props) => {
  const dispatch = useDispatch()
  // props
  // useEffect

  const fileUpload = useRef()
  //preview
  const [fileUrl, setFileUrl] = useState(null);
  const chgPreview = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl)
  }

  //for axios
  const recordDate = useSelector((state) => state.record.date)

  //upload btn
  const submitBtn = (e) => {
    e.preventDefault();
    let file = fileUpload.current.files[0];
    let newFileName = fileUpload.current.files[0].name;
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3upload(config);
    ReactS3Client.uploadFile(file, newFileName).then(data => {
      if(data.status === 204) {
        let imgUrl = data.location
        dispatch(addRecordDB(recordDate, imgUrl))
      } else {
        window.alert('사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.')
      }
    });
  }

  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="기록하기" display="none"/>
      {/* 날짜 */}
      <Record_Date />
      {/* 기록할 칼로리의 시점 */}
      <Record_When />
      {/* 칼로리 리스트 - 맵 */}
      <Grid bg={'#eee'} width="374px" height="361px" margin="23px auto" border_radius="44px">
        <Record_List />
      </Grid>
      {/* 사진 */}
      <Grid>
        <label for="File">
          <Grid bg={'#eee'} width="374px" height="236px" margin="23px auto" border_radius="44px" padding="15% 30%">
            <BiCamera size="118px" color={'white'}/>
          </Grid>
        </label>
        <FileBox type="file" id="File" accept="image/*"/>
        {/* btn */}
        <Button width="380px" height="56px" border_radius="44px" bg={theme.color.light} margin="0 auto 3% auto">
          <Text>기록하기</Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
}

Record.defaultProps = {

}

const FileBox = styled.input`
  display: none;
`;

export default Record;