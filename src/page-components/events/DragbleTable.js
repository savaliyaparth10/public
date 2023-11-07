import { Table, Spin } from 'antd'
import React, { useState, useEffect } from 'react';
import { CommonConstant } from 'utility';
import styled from 'styled-components';
import { DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List } from 'phosphor-react';

const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        },
      )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
      transition,
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 999,
          }
        : {}),
    };
    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if (child.key === 'drag') {
            return React.cloneElement(child, {
              children: (
                <span>
                <List
                  ref={setActivatorNodeRef}
                  size={20}
                  style={{
                    touchAction: 'none',
                    cursor: 'move',
                  }}
                  {...listeners}
                />
                  {child}
                </span>
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

const Customized = styled(Table)`
  tbody {
    tr {
      td {
        padding: 4px !important;
      }
    }
  }
`
export const DraggableAppTable = ({
    columns, data, currentPage, pageChanged,
    pageSize = CommonConstant.defaultPageSize, loading = false,
    total, filterChanged, onChange, onRowClick, onRowDoubleClick,orderChanged, ...rest
}) => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setDataSource(data)
    },[data])

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((i) => i.tempId === active.id || i.EventTicketId === active.id);
                const overIndex = prev.findIndex((i) => i.tempId === over?.id || i.EventTicketId === over?.id);
                let movedItems = arrayMove(prev, activeIndex, overIndex);
                movedItems = movedItems.map((item,index) => ({ ...item,DisplayOrder: index }))
                orderChanged(movedItems)
                return movedItems
            });
        }
    };

    return (
        <div>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource?.map((i) => i.tempId || i.EventTicketId)}
                    strategy={verticalListSortingStrategy}
                >
                    <Customized
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(ele) => ((ele.tempId || ele.EventTicketId))}
                        loading={{ indicator: <div><Spin /></div>, spinning: !dataSource.length && loading }}
                        components={{
                            body: {
                              row: Row,
                            },
                          }}
                        pagination={{
                            pageSize,
                            current: currentPage,
                            total,
                            onChange: pageChanged,
                            // showSizeChanger: true,
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onRowClick && onRowClick(record, rowIndex), // click row
                                onDoubleClick: () => onRowDoubleClick && onRowDoubleClick(record, rowIndex), // double click row
                            };
                        }}
                        {...rest}
                    />
                </SortableContext>
            </DndContext>
        </div>
    )
}
