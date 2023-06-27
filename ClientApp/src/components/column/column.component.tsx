import React from "react";
import styled from "styled-components";
import { grid, borderRadius } from "../styles/constants";
import { Draggable } from "react-beautiful-dnd";

import { ConstantsContainer, HeaderContainer, TitleContainer } from "../../styles/constants/constants.styles";


const Column = (props) => {
  const title = props.title;
  const quotes = props.quotes;
  const index = props.index;
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <ConstantsContainer ref={provided.innerRef} {...provided.draggableProps}>
          <HeaderContainer isDragging={snapshot.isDragging}>
            <TitleContainer
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {title}
            </TitleContainer>
          </HeaderContainer>
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null
            }}
            quotes={quotes}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
            useClone={Boolean(props.useClone)}
          />
        </ConstantsContainer>
      )}
    </Draggable>
  );
};

export default Column;
