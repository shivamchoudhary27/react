import React from 'react'
import MappingTable from './mappingTable'

type Props = {
  setActiveTab: any
}

const MappingCOsPOsPSOs = (props: Props) => {
  return (
    <MappingTable setActiveTab={props.setActiveTab} />
  )
}

export default MappingCOsPOsPSOs