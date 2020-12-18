  
import styled from 'styled-components';

const ItemText = styled.div`
   // display: block;
   background-color: ${ props => props.status !== 'normal' ? (props.status === 'executed' ? '#62856d' : '#917075') : '#fff'};
`

export { ItemText };