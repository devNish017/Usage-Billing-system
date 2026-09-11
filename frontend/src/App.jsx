

import './App.css'
import UserForm from './components/userForm'
import UserList from './components/UserList'
import ResourceForm from './components/ResouceForm'
import ResourceList from './components/ResourceList'
import StartUsage from './components/StartUsage'
import ActiveUsage from './components/ActiveUsage'
import UsageHistory from './components/UsageHistory'

function App() {
  

  return (
   <>
   <UserForm/>
   <UserList/>
   <ResourceForm/>
   <ResourceList/>
   <StartUsage/>
   <ActiveUsage/>
   <UsageHistory/>
   </>
  )
}

export default App
