import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function Codes(props) {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
        <Tree data={props.codes} setCode={props.setCode}  counts={props.counts}/>
    </TreeView>
  );
}


// import codesFlat from '../data/codes_flat.json'
// import { makeStyles } from '@material-ui/core/styles';
// import { TextField } from '@material-ui/core';
// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
// import { useState } from 'react';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// const useStyles = makeStyles({
//     root: {
//         flexGrow: 1,
//         maxWidth: 400,
//         '& > .MuiTextField-root': {
//             margin: '15px',
//         }
//     },

//     input: {
//         width: '85%',
//         margin: 'auto',
//         textAlign: 'center',
//     }
// })

// const Codes = (props) => {
//     const classes = useStyles();
//     const [ input, setInput ] = useState('')
//     let expandedIds = Object.keys(codesFlat)

//     return (
//         <div>
//             <TreeView
//                 className={classes.root}
//                 // defaultExpanded={shownArray}
//                 expanded={expandedIds}
//                 defaultCollapseIcon={<ExpandMoreIcon />}
//                 defaultExpandIcon={<ChevronRightIcon />}
//                 >
//                 <Tree data={props.codes} input={input} setCode={props.setCode} />
//             </TreeView>
//         </div>
//     )
// }

// export default Codes


const Tree = ({data, setCode, counts}) => {
    const selectCode = c => {
        console.log(c)
        setCode(c)
    }
    return (
      <>
            {data && data.map(item => {
              // let dimmed = input !== '' && item.title.toLowerCase().indexOf(input) === -1
              return (
                <TreeItem onClick={() => selectCode(item.key)} key={item.key} nodeId={item.key} label={item.title + " (" + item.key + ")" + ' (' + (counts[item.key] ? counts[item.key] : '0' ) + ')'}  >
                  {item.children.length > 0 && <Tree data={item.children} setCode={setCode} counts={counts} />}
                </TreeItem>
              )
            })}
        </>
    )
}
