import './App.css';
import ExDropdown from './exCompoenets/ExDropdown';
import ExForm from './exCompoenets/ExForm';
import ExModals from './exCompoenets/ExModal';
import './reset.css';

function App() {
  return (
    <>
      <div
        style={{
          height: '160px',
          border: '1px solid black',
          overflow: 'hidden',
        }}
      >
        overflow hidden이 있는 드롭다운의 부모 컴포넌트
        <ExDropdown />
      </div>
      <div>
        <ExModals />
      </div>
      <div>
        <ExForm />
      </div>
    </>
  );
}

export default App;
