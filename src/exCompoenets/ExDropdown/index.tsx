import Dropdown from '../../components/Dropdown';
import './style.css';

const ExDropdown = () => {
  const handleDropdownFnc = (item: string) => {
    alert(`${item}을 선택하셨습니다!`);
  };
  return (
    <>
      <Dropdown onItemSelect={handleDropdownFnc}>
        <Dropdown.Toggle className='dropdown-custom-toggle'>
          제가 토글입니다
        </Dropdown.Toggle>
        <Dropdown.List className='dropdown-custom-list'>
          <Dropdown.Item item='삭제'>삭제</Dropdown.Item>
          <Dropdown.Item item='수정'>수정</Dropdown.Item>
          <Dropdown.Item item='생성'>생성</Dropdown.Item>
          <Dropdown.Item item='공유'>공유</Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  );
};

export default ExDropdown;
