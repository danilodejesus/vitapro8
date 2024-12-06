export default function Baner({title, height}) {

  return (
    <figure className="banner">
      <figure className="banner-height" style={{height: `${height}px`}}>
        <img src="https://static.vecteezy.com/system/resources/previews/040/993/331/non_2x/ai-generated-green-cannabis-leaves-on-black-back-botanical-background-photo.jpg" />
        <div className="banner-text">
          <h1>{title}</h1>
          <div className="banner-posters">
            <div className="banner-poster"></div>
            <div className="banner-poster p1"></div>
            <div className="banner-poster p2"></div>
            <div className="banner-poster p3"></div>
          </div>
        </div>
      </figure>

      <style>
        {`
          .banner {
            width: 100%;
            margin: 20px auto;
            overflow: hidden;
            border-radius: 12px;
            position: relative;
          }

          .banner-height {
            height: 150px;
            background: black;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .banner-text {
            position: absolute;
            top: 20px;
            left: 20px;
          }

          .banner img {
            width: 100%;
          }

          .banner h1 {
            color: white;
            font-size: 20px;
          }

          .banner-posters {
            max-width: 300px;
            width: 100%;
            overflow: auto;
            display: flex;
            display: none;
          }

          .banner-poster {
            background: white;
            height: 90px;
            width: 70px;
            border-radius: 8px;
            margin-left: 15px;
            background: url(https://www.ucsf.edu/sites/default/files/styles/two_col_banner_medium/public/2024-02/joint-between-fingers-smoke-vertical.jpg) center center no-repeat;
            background-size: cover;
          }

          .p1 {
            background-image: url(https://ichef.bbci.co.uk/news/480/cpsprodpb/7727/production/_103330503_musk3.jpg.webp)
          }
          .p2 {
            background-image: url(https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/marijuana_joint-1296x728-header.jpg?w=1155&h=1528)
          }
          .p3 {
            background-image: url(https://cdn.britannica.com/95/230295-050-0B11E3F5/Woman-smoking-marijuana-In-plantation.jpg)
          }
        `}
      </style>
    </figure>
  )
}