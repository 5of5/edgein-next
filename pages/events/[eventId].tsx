import type { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ElemButton } from '../../components/ElemButton'
import { runGraphQl } from '../../utils'

type Props = {
  event: Record<string, any>
}

const Event: NextPage<Props> = (props) => {
  const router = useRouter()
  const { eventId } = router.query

  return   <div>
  <div className="absolute w-full z-0 bg-gray-200 overflow-hidden">
    <div
      className="
        relative
        text-white
        object-cover
        h-96
        w-full
        blur-lg
        brightness-90
      "
    >
      Event image as bg
    </div>
  </div>

  <div className="relative z-10 pt-10 mb-44 px-4 sm:px-6 lg:px-8">
    <div
      className="
        max-w-6xl
        mx-auto
        bg-white
        rounded-lg
        shadow-sm
        rounded-tl-lg rounded-tr-lg
        overflow-hidden
      "
    >
      <div className="flex flex-col md:grid md:grid-cols-3">
        <div className="col-span-2 h-72 sm:h-96">
          Event image
        </div>
        <div className="col-span-1">
          <div className="p-6 flex flex-col h-full justify-between">
            <div>
              <div>
                <time className="inline-block text-center" dateTime="2022-04-10">
                  <p className="uppercase">Jun</p>
                  <p className="text-xl">26</p>
                </time>
              </div>
              <h1 className="text-3xl my-4 font-bold">My Event</h1>
              <p className="text-dark-400">
                My event summary... Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua
              </p>
            </div>
            <div className="mt-auto text-lg text-dark-400">$99</div>
          </div>
        </div>
      </div>

      <div
        className="
          flex flex-col
          p-3
          border-y border-gray-200
          md:grid md:grid-cols-3
          gap-5
          items-center
        "
      >
        <div className="col-span-2">Event size</div>
        <div className="col-span-1">
          <ElemButton btn="dark" arrow>
            Link to event website
          </ElemButton>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-5 pt-14 px-3">
        <div className="col-span-2 text-xl text-gray-500">
          Details... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>

        <div className="col-span-1">
          <h3 className="font-bold">Date and time</h3>
          <p>Friday June 26, 4:00pm - Sunday June 28, 10pm</p>

          <h3 className="font-bold mt-6">Location</h3>
          <p>San Francisco</p>
        </div>
      </div>

      <div className="mt-14 pt-6 px-6 border-y border-gray-200">
        <h2 className="text-3xl font-bold">Speakers</h2>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-5 mt-3 w-full">
          <div
            className="
              border border-dark-100
              p-6
              rounded-lg
              transition-all
              hover:bg-white hover:shadow-md hover:-translate-y-1
            "
          >

            Speaker image

            <h3 className="font-bold text-center text-xl mt-2">Speaker Name</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

export async function getStaticPaths() {
  const { data: { events } } = await runGraphQl('{ events { id, event, date, location }}')

  return {
    paths: events.filter((event: {id: string}) => event.id).map((event: {id: string}) => ({ params: {eventId: event.id}})),
    fallback: true // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: { events } } = await runGraphQl(`{
    events(id: "${context.params?.eventId}") {
      id
      event
      date
    }
  }
`)

  return {
    props: {
      event: events[0] || null
    },
  }
}


export default Event
