## Description

Example implementation of free column division.

## Available Scripts

In the project directory, you can run:

### `yarn`

install dependecies

### `yarn start`

 start example project

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



## How to Use

```react
const View = () => {
    return (
        <ResizeColumn
            columnMinWidth={150}
            leftColumn={<Outline dataSource={articleDataSource}/>}
            rightColumn={<Article dataSource={articleDataSource}/>}
        />
    );
};
```



## Config

```react
divideLineWidth: 分割器的宽度，默认 '20px;
columnMinWidth: 每一块区域最小宽度，默认 '50px'
leftColumn: 组件，左边栏目
rightColumn: 组件，右边栏目
```



## Core Logic

```react
function ResizeColumn(props) {
    const layoutRef = useRef(null);
    const {
        divideLineWidth = 10,
        spacing = 10,
        columnMinWidth = 20,
        leftColumn = null,
        rightColumn = null,
    } = props;
    const columns = [leftColumn, rightColumn].map(Boolean).length;
    
    const columnWidthCache = localStorage.getItem('columnWidth');
    const [columnWidth, setColumnWidth] = useState(
        columnWidthCache ? parseInt(columnWidthCache, 10) : 150
    );
    const [dragging, setDragging] = useState(false);
    const [startPageX, setStartPageX] = useState(0);
    const pxWidth = columnWidth;
    
    useEffect(() => {
        if (!layoutRef || !layoutRef.current?.offsetWidth) {
            return;
        }
        
        setColumnWidth(
            Math.floor(layoutRef.current.offsetWidth - divideLineWidth) / columns
        );
    }, [columns, divideLineWidth]);
    
    const handleMouseDown = (event) => {
        setStartPageX(event.pageX);
        setDragging(true);
    };
    
    const handleMouseMove = (event) => {
        const currentColumnWidth = columnWidth + event.pageX - startPageX;
        
        if (!layoutRef || !layoutRef.current?.offsetWidth) {
            return;
        }
        
        if (
            currentColumnWidth >= columnMinWidth &&
            currentColumnWidth <= layoutRef.current.offsetWidth - columnMinWidth
        ) {
            setColumnWidth(currentColumnWidth);
            setStartPageX(event.pageX);
        }
    };
    
    const handleMouseUp = () => {
        setDragging(false);
        localStorage.setItem('columnWidth', String(columnWidth));
    };
    
    return (
        <div
            className="layout"
            style={{paddingLeft: `${pxWidth + (divideLineWidth + spacing) / 2}px`}}
            ref={layoutRef}
        >
            <div className="left-column" style={{width: `${pxWidth + divideLineWidth - spacing}px`}}>
                {leftColumn}
            </div>
            {!!rightColumn && (
                <div className="right-column">{rightColumn}</div>
            )}
            <div
                className="column-resizer"
                style={{left: `${pxWidth}px`}}
                onMouseDown={handleMouseDown}
            >
                {dragging && (
                    <div
                        className="resize-mask"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    />
                )}
            </div>
        </div>
    );
}
```



