import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Skeleton, Input } from 'antd';
import { useForm, Controller } from "react-hook-form";

const GetLightNovels = gql`
 {
  communities {
    id
    name
    posts(last:3) {
      id
      title
      author {
        id
        username
      }
    }
  }
}
`;

const AddLightNovel = gql`
  mutation AddLightNovel($data: LightNovelCreateInput!) {
    createOneLightNovel(data: $data) {
      id
      title
    }
  }
`

type FormData = {
  title: string;
}

export default function Home() {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const { loading, data } = useQuery(GetLightNovels);
  const [mutate] = useMutation(AddLightNovel);

  const onSubmit = handleSubmit(data => {
    mutate({
      variables: { data },
      refetchQueries: [
        { query: GetLightNovels }
      ]
    })

    reset();
  })

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={Input}
            name="title"
            placeholder="Light Novel Title"
            rules={{ required: true }}
            control={control}
          />
        </form>
        {loading ? <Skeleton /> : data?.lightNovels?.map(lightNovel =>
          <div key={lightNovel.id} style={{ paddingTop: 12 }}>{lightNovel.title}</div>)
        }
      </main>
    </div>
  )
}
