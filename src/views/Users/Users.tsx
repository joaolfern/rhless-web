import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import TableFilterable from 'components/TableFilterable/TableFilterable'
import { Column } from 'react-table'
import UserRepository from 'Repository/users'
import { IUser, IUsersListRequest, IUsersListRequestParams, IUsersListResponse, _userStatus, _userType } from 'types/Users'
import { IRequestSearchable } from 'Repository/type'
import { useForm } from 'react-hook-form'
import Tag from 'components/Tag/Tag'
import { tagStatus, translateStatus, translateType } from 'views/Users/constants'
import TagButton from 'components/TagButton/TagButton'
import UserForm from 'components/UserForm/UserForm'
import { useModalContext } from 'hooks/useModalContext'
import InputSm from 'components/Input/InputSm'

type IStateReponse = IUsersListResponse | null

const limit = 10

function Users () {
  const [response, setResponse] = useState<IStateReponse>(null)
  const [docs, setDocs] = useState<IUser[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const { updateShowModal } = useModalContext()

  const scrollRef = useRef<HTMLDivElement>(null)
  const cachedParams = useRef<IUsersListRequestParams>({ page: 1, limit })

  const [focusedUser, setFocusedUser] = useState<IUser | null>(null)

  const { handleSubmit: handleSearch, register } = useForm<IRequestSearchable>()
  const { ref: searchRef, ...searchRegister } = register('search')

  function editUser (user: IUser) {
    setFocusedUser(user)
    setShowForm(true)
    updateShowModal(true)
  }

  const editUserCallback = useCallback(editUser, [])

  const columns: Column<IUser>[] = useMemo(() => [
    {
      accessor: 'picture',
      Cell: (cell) => (
        <div className='flex gap-2'>
          <img
            loading='lazy'
            className='box-content w-10 h-10 p-2 rounded-full min-w-10 min-h-10 md:w-14 md:h-14 md:min-w-14 md:min-h-14'
            src={cell.value}
          />
        </div>
      )
    },
    {
      Header: 'Nome',
      accessor: 'name'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Tipo',
      accessor: 'type',
      Cell: ({ value, row }: { value: _userType, row: any }) => (
        <p>{translateType[value]}</p>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',

      Cell: ({ value, row }: { value: _userStatus, row: any }) => (
        <div className='grid gap-2 grid-cols-[100px_60px]'>
          <Tag
            type={tagStatus[value]}
          >
            {translateStatus[value]}
          </Tag>
          <TagButton
            type='ghost'
            onClick={() => editUser(row.original)}
          >
            Editar
          </TagButton>
        </div>
      )
    }
  ], [editUserCallback])

  async function getDocs (params: IUsersListRequestParams) {
    setLoadingDocs(true)

    const requestConfig: IUsersListRequest = {
      params
    }

    try {
      const response = await UserRepository.index(requestConfig)
      setResponse(response)
      const { docs } = response.data || {}
      setDocs(docs)

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

  function onSearch ({ search }: IRequestSearchable) {
    getDocs({ page: 1, limit, search })
  }

  function createUser () {
    setShowForm(true)
    updateShowModal(true)
  }

  function onCancelForm () {
    setFocusedUser(null)
  }

  function onSubmitForm () {
    getDocs({ ...cachedParams.current })
    updateShowModal(false)
    setFocusedUser(null)
  }

  return (
    <div
      className='flex flex-col overflow-auto grow'
      ref={scrollRef}
    >
      {showForm && (
        <UserForm
          onSubmitForm={onSubmitForm}
          onCancelForm={onCancelForm}
          focusedUser={focusedUser}
        />
      )}
      <TableFilterable
        data={docs}
        columns={columns}
        loading={loadingDocs}
        getPage={getNextPage}
        hasNextPage={!!response?.data.hasNextPage}
        page={response?.data.page || 1}
        pageTotal={response?.data.totalPages || 1}
        header={
          <div className='flex justify-between p-1'>
            <form
              onSubmit={handleSearch(onSearch)}
            >
              <InputSm
                placeholder='Buscar'
                forwardedRef={searchRef}
                onKeyDown={e => e.key === 'Enter' && handleSearch(onSearch)}
                {...searchRegister}
              />
            </form>

            <ButtonPrimary onClick={createUser} className='p-2'>
              Cadastrar Usuário
            </ButtonPrimary>
          </div>
        }
      />
    </div>
  )
}

export default Users
