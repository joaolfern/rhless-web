import React, { useEffect, useRef, useState } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import Input from 'components/Input/Input'
import TableFilterable from 'components/TableFilterable/TableFilterable'
import { Column } from 'react-table'
import UserRepository from 'Repository/users'
import { IUser, IUsersListRequest, IUsersListRequestParams, IUsersListResponse } from 'types/Users'
import { IRequestSearchable } from 'Repository/type'
import { useForm } from 'react-hook-form'
import Tag from 'components/Tag/Tag'
import { translateStatus } from 'views/Users/constants'
import TagButton from 'components/TagButton/TagButton'

const columns: Column<IUser>[] = [
  {
    accessor: 'picture',
    Cell: (cell) => (
      <div className='flex gap-2'>
        <img
          className='box-content w-10 h-10 p-2 rounded-full min-w-10 min-h-10 md:w-14 md:h-14 md:min-w-14 md:min-h-14'
          src={cell.value}
        />
      </div>
    )
  },
  {
    Header: 'Email',
    accessor: 'email'
  },

  {
    Header: 'Status',
    accessor: 'status',
    Cell: (cell) => (
      <div className='grid gap-2 grid-cols-[100px_60px]'>
        <Tag
          type='secondary'
        >
          {translateStatus[cell.value]}
        </Tag>
        <TagButton
          type='ghost'
        >
          Editar
        </TagButton>
      </div>
    )
  }
]

const mockedData: IUser[] = [
  {
    _id: '1',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '2',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '3',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '4',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '5',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '6',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '7',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '8',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '9',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '10',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '11',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '12',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '13',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '14',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  },
  {
    _id: '15',
    email: 'joao@yopmail.com',
    name: 'Joào',
    picture: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4',
    status: 'active'
  }
]

type IStateReponse = Omit<IUsersListResponse, 'data.docs'> | null

const limit = 10

function Users () {
  const [response, setResponse] = useState<IStateReponse>(null)
  const [docs, setDocs] = useState<IUser[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const cachedParams = useRef<IUsersListRequestParams>({ page: 1, limit })

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  async function getDocs (params: IUsersListRequestParams) {
    setLoadingDocs(true)
    setDocs(mockedData)

    const requestConfig: IUsersListRequest = {
      params
    }

    try {
      const reponse = await UserRepository.index(requestConfig)
      const { docs } = reponse.data
      setResponse(response)
      setDocs(prev => {
        if (requestConfig.params.page === 1) return docs
        return [...prev, ...docs]
      })

      cachedParams.current = { ...cachedParams.current, ...params }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    getDocs(cachedParams.current)
  }, [])

  function getNextPage (page: number) {
    scrollRef.current?.scrollTo({ top: 0 })
    getDocs({ page, limit })
  }

  function onSearch (values: IRequestSearchable) {
    console.log('search', values)
  }

  return (
    <div
      className='flex flex-col overflow-auto grow'
      ref={scrollRef}
    >
      <TableFilterable
        data={docs}
        columns={columns}
        loading={loadingDocs}
        getPage={getNextPage}
        hasNextPage={!!response?.data.hasNextPage}
        page={response?.data.page || 1}
        pageTotal={response?.data.pageTotal || 1}
        header={
          <div className='flex justify-between p-1'>
            <form
              onSubmit={handleSearch(onSearch)}
            >
              <Input
                className='p-2'
                placeholder='Buscar'
                forwardedRef={searchRef}
                {...searchRegister}
              />
            </form>

            <ButtonPrimary className='p-2'>
              Cadastrar Usuário
            </ButtonPrimary>
          </div>
        }
      />
    </div>
  )
}

export default Users
