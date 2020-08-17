import React, {Component} from "react";
export class WishlistBanner extends Component{
    render=() =>
    <h4 className="text-white text-center p-2 bg-custom">
        {this.props.name}'s Wish List
        ({this.props.tasks.filter(t=> !t.done).length}) items to buy)
    </h4>
}