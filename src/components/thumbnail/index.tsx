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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      padding: '0 !important',
    },
    absolute: {
      position: 'absolute',
    }
  }),
);

const CoverImage = (props) => {
    const classes = useStyles(props);
    const { fileEdges, cover, children } = props;

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
          className={`${classes.fluid} ${props.className}`}
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
          backgroundImage: `url(${coverURL})`
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
query ThumbnailQuery {
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
            fluid(maxWidth: 420) {
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