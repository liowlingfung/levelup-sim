import React from 'react'

function LevelUI(props) {
    let experience;

    const lastXP = props.lastExperienceGained;

    if(props.experience > 200){
        experience = 200;
    }
    else{
        experience = props.experience;
    }

    const level = props.level;

  return (
    <div className='level-ui'>
        <strong><p>Lv. {level}</p></strong>
        <div className='level-progress-border'>
            <div className='level-progress' style={{width:`${experience}px`}}></div>
        </div>
        {props.experience >= 200 ? <label>Level Up!</label> : null}
        {lastXP > 60 ? <label id='critical-notify'>CRIT!</label> : null}
    </div>   
  )
}

export default LevelUI