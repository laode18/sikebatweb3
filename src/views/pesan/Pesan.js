/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import contract from 'src/views/pengguna/contracts/contract';
import Web3 from 'web3';
import contractpesan from './contracts/contractpesan';
import './pesan.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>SIM Kelurahan</span>
      <div className='user'>
        <img
          className='img'
          src='../assets/avataradmin.png'
          alt=''
        />
        <span style={{ fontWeight: '500' }}>Admin</span>
      </div>
    </div>
  );
};

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [onSearch, searchQuery]);

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          className='inputs'
          type='text'
          placeholder='Find a user'
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const Chats = ({ users, onSelectUser }) => {
  return (
    <div className='chats'>
      {users.map((user, index) => (
        <div className='userChat' key={index} onClick={() => onSelectUser(user)}>
          <img src='../assets/user.png' alt='' />
          <div className='userChatInfo'>
            <span>{user.fullName}</span>
            <p>{user.walletId}</p>
            <p hidden>{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Sidebar = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const totalUsers = await contract.methods.totalUsers().call();
      const usersArray = [];

      for (let i = 1; i <= totalUsers; i++) {
        const user = await contract.methods.getUser(i).call();
        if (user.username !== '') {
          usersArray.push(user);
        }
      }

      setUsers(usersArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Update filteredUsers when users or search query changes
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.walletId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [users, searchQuery]);
  
  return (
    <div className='sidebar'>
      <Navbar />
      <Search onSearch={(query) => setSearchQuery(query)} />
      <Chats users={filteredUsers} onSelectUser={onSelectUser} />
    </div>
  );
};

const Usermessage = ({ selectedUser }) => {
  const [pesans, setPesans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    getPesans();
  }, [selectedUser]); // Rerun the effect when selectedUser changes

  const getPesans = async () => {
    try {
      setIsLoading(true);
      const totalPesans = await contractpesan.methods.totalPesans().call();
      const userId = selectedUser ? selectedUser.username : '';
      const pesansArray = [];

      for (let i = 1; i <= totalPesans; i++) {
        const pesan = await contractpesan.methods.getPesan(i).call();
        if (pesan.userId === userId) {
          pesansArray.push(pesan);
        }
      }

      setPesans(pesansArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const calculateTimeDifference = (sentTimestamp) => {
  const currentTime = new Date().getTime();
  const sentTime = new Date(sentTimestamp).getTime();
  const differenceInMinutes = Math.floor((currentTime - sentTime) / (1000 * 60));

  if (differenceInMinutes >= 60 && differenceInMinutes < 180) {
    // Lebih dari 60 menit dan kurang dari 180 menit (3 jam)
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    return `${differenceInHours} jam yang lalu`;
  } else if (differenceInMinutes >= 180 && differenceInMinutes < 1440) {
    // Lebih dari 3 jam dan kurang dari 24 jam
    return `${Math.floor(differenceInMinutes / 60)} jam yang lalu`;
  } else if (differenceInMinutes >= 1440) {
    // Lebih dari 24 jam (1 hari)
    return "kemarin";
  } else {
    // Kurang dari 60 menit
    return `${differenceInMinutes} menit yang lalu`;
  }
};

if (!selectedUser) {
  return null; // Return early if selectedUser is null
}

  return (
    <>
      {pesans.map((pesan, index) => (
        <div className='message owner' key={index}>
          
          <div className='messageContent'>
            <p>{pesan.isiPesan}</p>
            <span>{calculateTimeDifference(pesan.tanggal)} </span>
          </div>
        </div>
      ))}
    </>
  );
};

// const Message = () => {
//   return (
//     <div className='messagegg ownergg'>
//         <div className="messageInfoUser">
//             <img src="https://i.pinimg.com/originals/91/0b/2d/910b2d5c7c3eda2021eae5697a9527e3.jpg" alt="" />
//             <span>Just Now</span>
//         </div>
//         <div className="messageContentUser">
//             <p>Hello</p>
//         </div>
//     </div>
//   )
// }

const Messages = ({ selectedUser }) => {
  return (
    <div className='messages'>
        <Usermessage selectedUser={selectedUser} />
    </div>
  )
}

function Input({ selectedUser }) {
  const [pesans, setPesans] = useState([]);
  const [newPesan, setNewPesan] = useState({
    userId: selectedUser ? selectedUser.userId : '', // Add default values for all fields
    tanggal: new Date().toLocaleString(),
    isiPesan: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    getPesans();
  }, []);

  useEffect(() => {
    // Update userId field when selectedUser changes
    setNewPesan((prevState) => ({
      ...prevState,
      userId: selectedUser ? selectedUser.userId : '',
    }));
  }, [selectedUser]);

  const getPesans = async () => {
    try {
      setIsLoading(true);
      const totalPesans = await contractpesan.methods.totalPesans().call();
      const pesansArray = [];

      for (let i = 1; i <= totalPesans; i++) {
        const pesan = await contractpesan.methods.getPesan(i).call();
        if (pesan.userId !== '') {
          pesansArray.push(pesan);
        }
      }

      setPesans(pesansArray);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPesan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!selectedUser) {
    return null; // Return early if selectedUser is null
  }

  const userId = selectedUser.username;

  const createPesan = async () => {
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const pesanCount = await contractpesan.methods.totalPesans().call();
      const pesanId = parseInt(pesanCount) + 1;
      const userId = selectedUser.username;
      const pesanWithId = { ...newPesan, pesanId: pesanId.toString(), userId: userId };
      await contractpesan.methods.createPesan(pesanWithId).send({ from: accounts[0] });
      setNewPesan({});
      await getPesans(); // Refresh the user list after creating a new user
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='input'>
        <form className="send">
        <input type="text" name="userId" value={userId} onChange={handleInputChange} hidden/>
        <input type="text" name="tanggal" value={newPesan.tanggal || ''} onChange={handleInputChange} hidden/>
        <input type="text" placeholder='Type something....' name="isiPesan" value={newPesan.isiPesan || ''} onChange={handleInputChange} />
       
        <Button variant="primary" onClick={createPesan}>
          Kirim
        </Button>
    
        </form>
    </div>
  )
}

const Chat = ({ selectedUser }) => {
  return (
    <div className='chat'>
        <div className="chatInfo">
          <span>{selectedUser ? selectedUser.fullName : 'No user selected'}</span>
        </div>
        <Messages selectedUser={selectedUser} />
        <Input selectedUser={selectedUser} />
    </div>
  )
}

const Pesan = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='homes'>
      <div className='containers'>
        <Sidebar onSelectUser={setSelectedUser} />
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default Pesan;