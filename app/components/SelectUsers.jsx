var React = require("react");

var SelectUsers = React.createClass({
    render: function () {
        var {users} = this.props;
        // var users = [
        //     'Priscila Alves',
        //     'Carlos Carreiras',
        //     'Andre Lourenco',
        //     'Roberto de Souza',
        //     'Ricardo Nunes',
        //     'Borja Carrillo'
        // ];
        var renderUsers = () => {
            return users.map((user) => {
                return (
                    <option key={user}>{user}</option>
                );
            });
        };
        return (
            <li>
                <input type="text" placeholder="Select user" list='users' id="selectedUser"/>
                <datalist id="users">
                    {renderUsers()}
                </datalist>
            </li>
        );
    }
});

module.exports = SelectUsers;
