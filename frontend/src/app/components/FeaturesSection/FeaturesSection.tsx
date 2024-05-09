import { useMediaQuery } from 'react-responsive'
import FeaturesSectionItem from '../FeaturesSectionItem/FeatureSectionItem'

const FeaturesSection = () => {
  return (
    <div id='features' className='mt-8'>
      <div className='w-full flex justify-center'>
        <p style={{ fontWeight: 600, fontSize: 40 }}>Our Features</p>
      </div>
      <div style={{ background: 'rgba(224, 224, 224, 0.15)' }}>
        <FeaturesSectionItem
          videoUrl={'https://www.youtube.com/embed/701Ou8BI4JQ'}
          title={'Search your fashion'}
          content={
            "With the intelligent search feature, you can input descriptions or keywords related to the products you're interested in. The system quickly categorizes results and displays the most relevant items, saving you time and helping you find stylish clothing easily."
          }
          variant='reverse'
        />
        <FeaturesSectionItem
          videoUrl={'https://www.youtube.com/embed/701Ou8BI4JQ'}
          title={'Search your fashion'}
          content={
            "With the intelligent search feature, you can input descriptions or keywords related to the products you're interested in. The system quickly categorizes results and displays the most relevant items, saving you time and helping you find stylish clothing easily."
          }
          variant='default'
        />
        <FeaturesSectionItem
          videoUrl={'https://www.youtube.com/embed/701Ou8BI4JQ'}
          title={'Search your fashion'}
          content={
            "With the intelligent search feature, you can input descriptions or keywords related to the products you're interested in. The system quickly categorizes results and displays the most relevant items, saving you time and helping you find stylish clothing easily."
          }
          variant='reverse'
        />
      </div>
    </div>
  )
}

export default FeaturesSection
