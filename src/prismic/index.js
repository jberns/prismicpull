import React, { Component } from "react";
import Prismic from "prismic-javascript";
import { Link, RichText, Date } from "prismic-reactjs";

class PrismicExport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null
    };
  }

  componentWillMount() {
    const apiEndpoint = "https://quadblocs.prismic.io/api/v2";

    Prismic.api(apiEndpoint).then(api => {
      api.getByUID("page", "quickstart").then(response => {
        if (response) {
          console.log(response);
          this.setState({ doc: response });
        }
      });
    });
  }

  // Link Resolver
  linkResolver(doc) {
    // Define the url depending on the document type
    if (doc.type === "page") {
      return "/page/" + doc.uid;
    } else if (doc.type === "blog_post") {
      return "/blog/" + doc.uid;
    }

    // Default to homepage
    return "/";
  }

  render() {
    if (this.state.doc) {
      const document = this.state.doc.data;
      return (
        <div>
          <h1>{RichText.asText(document.title)}</h1>
          <img alt="cover" src={document.image.url} />
          {RichText.render(document.description, this.linkResolver)}
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default PrismicExport;
