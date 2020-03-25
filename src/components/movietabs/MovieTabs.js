import React from 'react';
import './MovieTabs.scss';

const MovieTabs = ({sort_by, updateSortBy}) => {


    const sortbyArr = [{label: 'popularity.desc', name: 'Popularity description'},
    {label: 'release_date.desc', name: 'Realese date'},
    {label: 'vote_average.desc', name: 'Average description'},
    {label: 'title.desc', name: 'Asian Movies'}
  ]

    const HandleClick = value => {
        return () => {
            updateSortBy(value)
        }
    }


    const listitem = sortbyArr.map(({label, name }) => {
        
        const isActive = label === sort_by;
        const ClassNames = 'nav-link ' + (isActive ? 'active' : '');
        // const inx = item.substring(0, item.indexOf('.'));
        // console.log(inx);
        return(
            <li className='nav-item'>
                <a className={ClassNames} onClick={HandleClick(label)}>
                    {name}
                </a>
            </li>
        )
    })

    return(
        <ul className='nav nav-pills mt-4'>
            {listitem}
        </ul>
    )

}

export default MovieTabs;