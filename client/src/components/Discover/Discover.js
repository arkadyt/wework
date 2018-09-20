import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FaUserPlus as IcoAdd } from 'react-icons/fa'

import './Discover.css'
import Field from '../Field/Field'
import FBSpinner from '../FBSpinner/FBSpinner'
import { withEither } from '../../hocs/withEither'

// send a request for a sample
// get a list returned:
const creatorsList = [
    {
        _id: 0,
        name: "Maha Bergen",
        avatar: "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm",
        title: "Senior JS Developer",
        company: "Facebook"
    },
    {
        _id: 1,
        name: "Bozo Sursen",
        avatar: "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm",
        title: "C# Developer",
        company: "Facebook"
    },
    {
        _id: 0,
        name: "Maga Bogov",
        avatar: "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm",
        title: "Business Analyst",
        company: "Infosys"
    },
    {
        _id: 0,
        name: "Surplus Ivanovich",
        avatar: "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm",
        title: "Cook",
        company: "Dublin Lazy Dog Restaurants & Bar"
    },
    {
        _id: 0,
        name: "Ahmet Dzhuma",
        avatar: "//www.gravatar.com/avatar/254dbff8aa12a023b9f1052ad80b1831?s=200&r=pg&d=mm",
        title: "CEO",
        company: "Revature"
    }
]

const ListNode = ({
    name, avatar, title, company
}) => (
        <div className="ListNode-container">
            <img className="ListNode-img" src={avatar} alt="" />
            <div className="ListNode-name">
                <p>{name}</p>
                <p>{title} at {company}</p>
            </div>
            <Field
                type="linkButton"
                style={{ color: 'black', fontSize: '1.4rem' }}>
                <IcoAdd />
            </Field>
        </div>
    )

const Discover = () => (
    <Fragment>
        <h3>Add these creators to your feed:</h3>
        <div>
            {creatorsList.map(item => {
                return <ListNode key={item._id} {...item} />
            })}
        </div>
    </Fragment>
)

export default connect()(({

}) => (
        <div className="Discover-container">
            <Discover />
        </div>
    ))