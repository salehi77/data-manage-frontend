import React from 'react'



const Links = (props) => {


  return (


    <svg
      style={{
        height: '100%',
        width: '100%',
        transform: `scale(${props.board.scale}) translate(${props.board.x}px, ${props.board.y}px)`,
        position: 'absolute',
        overflow: 'visible',
      }}
    >

      {

        props.links.map((link, index) => {

          let from = props.nodes.find(node => node.id === link.from)
          let to = props.nodes.find(node => node.id === link.to)


          if (from && to)
            return (
              <path
                key={index} fill='transparent' stroke='#aaaaaa' strokeWidth='3'
                d={`M ${from.left + 75} ${from.top + 50}
                    L ${to.left + 75} ${to.top + 50}`}
              />
            )

        })

      }


    </svg>



  )
}

export default Links