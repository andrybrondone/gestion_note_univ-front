import { RiMailSendLine, RiNotification2Fill } from "react-icons/ri";
import { Container } from "../ui/components/container/Container";
import { Button } from "../ui/design-system/button/Button";
import { Logo } from "../ui/design-system/logo/Logo";
import { Spinner } from "../ui/design-system/spinner/Spinner";
import { Typography } from "../ui/design-system/typography/Typography";

export default function DesignSystem() {
  return (
    <>
      <Container className="mb-10 mt-3 p-10 space-y-10 bg-gray-400 shadow-lg">
        <div>
          {/* Typography */}
          <div className="space-y-2">
            <p>Display</p>
            <Typography variant="display" component="div">
              Lorem ipsum dolor sit
            </Typography>
            <p>H1</p>
            <Typography variant="h1" component="h1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>H2</p>
            <Typography variant="h2" component="h2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>H3</p>
            <Typography variant="h3" component="h3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>H4</p>
            <Typography variant="h4" component="h4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>H5</p>
            <Typography variant="h5" component="h5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Lead</p>
            <Typography variant="lead" component="h1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Body-lg</p>
            <Typography variant="body-lg" component="h3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Body-base</p>
            <Typography variant="body-base" component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Body-sm</p>
            <Typography variant="body-sm" component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Caption1</p>
            <Typography variant="caption1" component="h2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Caption2</p>
            <Typography variant="caption2" component="h3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Caption3</p>
            <Typography variant="caption3" component="h4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
            <p>Caption4</p>
            <Typography variant="caption4" component="h5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              reiciendis asperiores vel exercitationem voluptates fugiat!
            </Typography>
          </div>

          <div className="flex items-start gap-7">
            {/* Spinners */}
            <div className="space-y-2">
              <p>Spinners</p>
              <div className="flex items-center gap-2 border border-gray-400 rounded">
                <Spinner size="small" />
                <Spinner />
                <Spinner size="large" />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 p-10">
              <Logo size="very-small" />
              <Logo size="small" />
              <Logo />
              <Logo size="large" />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 p-10">
              <Button isLoading size="small">
                Accent
              </Button>
              <Button isLoading size="small" variant="secondary">
                secondary
              </Button>
              <Button isLoading size="small" variant="outline">
                outline
              </Button>
              <Button isLoading size="small" variant="disabled" disabled>
                disabled
              </Button>
              <Button
                isLoading
                size="small"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
              />
              <Button
                isLoading
                size="small"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
                iconPosition="left"
              >
                Accent
              </Button>
              <Button
                isLoading
                size="small"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
              >
                Accent
              </Button>
            </div>
            <div className="flex items-center gap-4 p-10">
              <Button size="small">Accent</Button>
              <Button size="small" variant="secondary">
                secondary
              </Button>
              <Button size="small" variant="outline">
                outline
              </Button>
              <Button size="small" variant="disabled" disabled>
                disabled
              </Button>
              <Button
                size="small"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
              />
              <Button
                size="small"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
                iconPosition="left"
              >
                Accent
              </Button>
              <Button
                size="small"
                variant="ico"
                icon={{ icon: RiMailSendLine }}
              >
                Accent
              </Button>
            </div>
            <div className="flex items-center gap-4 p-10">
              <Button>Accent</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="outline">outline</Button>
              <Button variant="disabled" disabled>
                disabled
              </Button>
              <Button variant="ico" icon={{ icon: RiNotification2Fill }} />
            </div>
            <div className="flex items-center gap-4 p-10">
              <Button size="large">Accent</Button>
              <Button size="large" variant="secondary">
                secondary
              </Button>
              <Button size="large" variant="outline">
                outline
              </Button>
              <Button size="large" variant="disabled" disabled>
                disabled
              </Button>
              <Button
                size="large"
                variant="ico"
                icon={{ icon: RiNotification2Fill }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
