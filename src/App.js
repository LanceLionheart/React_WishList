import React, { Component } from 'react';
import { WishlistBanner } from "./WishlistBanner";
import { WishlistCreator } from "./WishlistCreator";
import { WishlistRow } from "./WishlistRow";
import { VisibilityControl } from "./VisibilityControl";
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: "Lance",
      wishlistItems: [
        // {
        //   action: "N64",
        //   done: false
        // },
        // {
        //   action: "Zelda: Ocarina of Time",
        //   done: false
        // },
        // {
        //   action: "Banjo Kazooie",
        //   done: false
        // },
        // {
        //   action: "Jumanji Board Game",
        //   done: false
        // },
        // {
        //   action: "Pokemon Red",
        //   done: false
        // }
      ],
      showCompleted: false
    }
  }

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Lance" ? "Nikki" : "Lance"
    })

  }

  createWishlist = (task) => {
    if (!this.state.wishlistItems.find(x => x.action === task)) {
      this.setState({
        wishlistItems: [...this.state.wishlistItems, { action: task, done: false }]
      },
        () => localStorage.setItem("wishlists", JSON.stringify(this.state))
      );
    }
  }

  wishlistTableRows = (doneValue) => this.state.wishlistItems.filter(item => item.done === doneValue).map
    (item =>
      <WishlistRow key={item.action} item={item} callback={this.toggleWishlist} />
    )

  toggleWishlist = (wishlist) => this.setState(
    {
      wishlistItems: this.state.wishlistItems.map(item => item.action === wishlist.action ? { ...item, done: !item.done } : item)
    }, () => localStorage.setItem("wishlists", JSON.stringify(this.state))
  );

  componentDidMount = () => {
    let data = localStorage.getItem("wishlists")
    this.setState(data != null ? JSON.parse(data) :
      {
        userName: "Lance",
          wishlistItems:  [     
        {
        action: "N64",
        done: false
      },
      {
        action: "Zelda: Ocarina of Time",
        done: false
      },
      {
        action: "Banjo Kazooie",
        done: false
      },
      {
        action: "Jumanji Board Game",
        done: false
      },
      {
        action: "Pokemon Red",
        done: false
      }

        ],
        showCompleted: false
      });
}


render = () =>
  <div className="container-fluid">
    <WishlistBanner name={this.state.userName} tasks={this.state.wishlistItems} />
    <div className="container-fluid">
      <WishlistCreator callback={this.createWishlist} />

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Bought</th>
          </tr>
        </thead>
        <tbody>
          {this.wishlistTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
      <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>


      {this.state.showCompleted &&
      <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Bought</th>
        </tr>
      </thead>
      <tbody>
        {this.wishlistTableRows(true)}
      </tbody>
    </table>
    }
    </div>
  </div>
}
