import React, {Component} from 'react'

export default class KeyboardListItem extends Component {

    constructor(props) {
        super(props)

        if (this.props.keyboard.imgs.length > 0) {
            this.state = {
                currentImg: this.props.keyboard.imgs[0]
            }
        } else {
            this.state = {
                currentImg: null
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <img src={this.state.currentImg} />
                </div>
                <div>
                    {this.props.keyboard.name}
                </div>
            </div>
        )
    }

}