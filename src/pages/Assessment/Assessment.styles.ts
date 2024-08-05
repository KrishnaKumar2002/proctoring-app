import styled from 'styled-components';

export const ContentContainer = styled.div`
  line-height: 260px;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  margin-top: 16px;
`;
