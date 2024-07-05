import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import './defaultStyle.css';

interface DropdownContextType {
  open: boolean;
  toggle: (value: boolean) => void;
  close: () => void;
  onItemSelect?: (item: string) => void;
  selectedItem?: string;
  toggleRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<HTMLUListElement>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

interface DropdownProps extends React.PropsWithChildren {
  onItemSelect?: (item: string) => void;
}

function Dropdown({ children, onItemSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const toggleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggle = useCallback((value: boolean) => setOpen(value), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!open) return; // 드롭다운이 닫혀있으면 아무 것도 하지 않음

      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close, open]);

  const handleItemSelect = useCallback(
    (item: string) => {
      setSelectedItem(item);
      if (onItemSelect) {
        onItemSelect(item);
      }
      close();
    },
    [onItemSelect, close]
  );

  return (
    <DropdownContext.Provider
      value={{
        open,
        toggle,
        close,
        onItemSelect: handleItemSelect,
        selectedItem,
        toggleRef,
        listRef,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

interface ToggleProps extends React.PropsWithChildren {
  changeToggleOnSelect?: boolean;
  className?: string;
}

function Toggle({
  children,
  changeToggleOnSelect = false,
  className,
}: ToggleProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Toggle must be used within a FlyOut');
  }

  const { open, toggle, selectedItem, toggleRef } = context;

  return (
    <div
      className={`dropdown-toggle ${className || ''}`}
      ref={toggleRef}
      onClick={(e) => {
        toggle(!open);
        e.preventDefault();
      }}
    >
      {selectedItem && changeToggleOnSelect ? selectedItem : children}
    </div>
  );
}

interface ListProps extends React.PropsWithChildren {
  className?: string;
}

function List({ children, className }: ListProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('List must be used within a FlyOut');
  }

  const { open, toggleRef, listRef } = context;

  const updatePosition = useCallback(() => {
    if (listRef.current && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      listRef.current.style.top = `${rect.bottom + window.scrollY}px`;
      listRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [toggleRef, listRef]);

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  return open
    ? createPortal(
        <ul
          ref={listRef}
          className={`dropdown-list ${className || ''}`}
          style={{ position: 'absolute' }}
        >
          {children}
        </ul>,
        document.body
      )
    : null;
}

interface ItemProps extends React.PropsWithChildren {
  item: string;
  className?: string;
}

function Item({ children, item, className }: ItemProps) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Item must be used within a FlyOut');
  }

  const { onItemSelect } = context;

  const handleClick = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  return (
    <li onClick={handleClick} className={`dropdown-item ${className || ''}`}>
      {children}
    </li>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;

// Compound Components 패턴

export default Dropdown;
