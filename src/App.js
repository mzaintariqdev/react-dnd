import styled from 'styled-components';
import { List } from './components/List';

import { ListProvider } from './contexts/ListContext';

function App() {
  return (
    <ListProvider>
      <Wrapper>
        <List />
      </Wrapper>
    </ListProvider>
  );
}

export default App;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  h1 {
    display: flex;
    justify-content: center;
  }
`;
