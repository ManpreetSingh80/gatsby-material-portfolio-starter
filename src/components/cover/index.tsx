import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import * as path from "path";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    fluid: {
        // minHeight: '360px',
        height: 'auto',
        maxHeight: '60vh',
        width: '100%',
        position: 'relative'
    }
  }),
);

const CoverImage = (props) => {
    const classes = useStyles(props);
    const { fileEdges, cover, children, parallax = true } = props;

    let windowScrollTop;
    const [transform, setTransform] = React.useState(
        "translate3d(0," + windowScrollTop + "px,0)"
    );
    React.useEffect(() => {
      if (parallax) {
        if (window.innerWidth >= 768) {
          windowScrollTop = window.pageYOffset / 3;
          window.addEventListener("scroll", resetTransform);
        } else {
          windowScrollTop = 0;
        }
        return function cleanup() {
          if (window.innerWidth >= 768) {
              window.removeEventListener("scroll", resetTransform);
          } else {
            windowScrollTop = 0;
          }
        };
      }
    });
    const resetTransform = () => {
        if (window.innerWidth >= 768) {
          windowScrollTop = window.pageYOffset / 3;
        } else {
          windowScrollTop = 0;
        }
        setTransform("translate3d(0," + windowScrollTop + "px,0)");
    };

    const coverNodeList = fileEdges.filter(fileNode => {
      if (fileNode.node.childImageSharp === null) return false;

      if (
        fileNode.node.absolutePath.indexOf(
          path.join("/static/img/", cover)
        ) !== -1
      )
        return true;

      return false;
    });

    if (coverNodeList.length === 1) {
      return (
        <Img
          fluid={coverNodeList[0].node.childImageSharp.fluid}
          className={classes.fluid}
          style={{transform: transform}}
        >
          {children}
        </Img>
      );
    }

    /* tslint no-undef: "off" */
    const coverURL =
      cover.substring(0, 1) === "/"
        ? __PATH_PREFIX__ + cover
        : cover;
    return (
      <div
        style={{
          backgroundImage: `url(${coverURL})`,
          transform: transform
        }}
        className={classes.fluid}
      >
          {children}
      </div>
    );
  }

const Cover = (props: any) => {
    return (
        <StaticQuery
            query={query}
            // tslint:disable-next-line:react-this-binding-issue
            render={(data: any) => (
                <CoverImage {...props} fileEdges={data.allFile.edges}/>
            )}
        />
    );
}

const query = graphql`
query CoverQuery {
    allFile {
      edges {
        node {
          id
          absolutePath
          childImageSharp {
            id
            resolutions {
              base64
              tracedSVG
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
              originalName
            }
            internal {
              contentDigest
              type
              owner
            }
            fluid(maxWidth: 1280) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`;

export default Cover;