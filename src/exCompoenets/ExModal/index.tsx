import ModalTrigger from '../../components/Modal/ModalTrigger';
import './style.css';

const ExModals = () => {
  return (
    <>
      <ModalTrigger
        renderModalContent={(closeModal) => (
          <>
            <h2>기본 모달</h2>
            <p>오버레이를 클릭해도 닫히지 않습니다.</p>
            <button onClick={closeModal}>닫기</button>
          </>
        )}
      >
        취소/확인 모달 열기
      </ModalTrigger>
      <ModalTrigger
        classNameOverlay='black'
        renderModalContent={(closeModal) => (
          <>
            <h2>closeOnOverlayClick 속성 모달</h2>
            <p>오버레이 색을 커스텀 적용했습니다(검정).</p>
            <p>오버레이를 클릭하면 모달이 닫힙니다.</p>
            <button onClick={closeModal}>닫기</button>
          </>
        )}
        closeOnOverlayClick
      >
        닫기 버튼 모달 열기
      </ModalTrigger>
    </>
  );
};

export default ExModals;
