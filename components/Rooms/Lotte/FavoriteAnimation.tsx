import React, { ComponentType, useState } from 'react';
import Lottie, { EventListener } from 'react-lottie';
import likeAnimation from '@/assets/lottie/heart.json';

import { useTranslation } from 'react-i18next';

interface IProps {
  autoPlay?: boolean;
  animation?: string;
  width?: string;
  height?: string;
  loop?: boolean;
  handleAddFavoriteRoom?: (isSaved: boolean) => void;
}

const FavoriteAnimation: ComponentType<IProps> = (props) => {
  const { autoPlay, width, height, loop, handleAddFavoriteRoom } = props;

  const [isSaved, toggleSaved] = useState<boolean>(false);
  const [isPaused, togglePaused] = useState<boolean>(false);
  const [isStopped, toggleStopped] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);

  const defaultOptions: any = {
    loop: false,
    autoPlay: false,
    animationData: likeAnimation

  };


  const clickHandler = () => {
    handleAddFavoriteRoom(isSaved);
    if (!isStopped) {
      setDirection(direction * -1);
    }
    toggleStopped(false);
    toggleSaved(!isSaved);

  };


  return (
    <div className="animation" onClick={clickHandler}>
      <Lottie
        // onClick={handleClick}
        options={defaultOptions}
        width={'100%'}
        height={'100%'}
        isStopped={isStopped}
        isPaused={isPaused}
        speed={2}
        direction={direction}
        // eventListeners={eventListeners}
      />
    </div>
  );
};

// FavoriteAnimation.defaultProps = {
//   animation: '',
//   width: '100%',
//   height: '100%',
//   loop: false,
//   autoPlay: true
// };

export default FavoriteAnimation;

// class FavoriteAnimation extends Component {
//   static defaultProps = {
//     animation: '',
//     width: '100%',
//     height: '100%',
//     loop: false,
//     autoPlay: true,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       isStopped: !this.props.autoPlay,
//       isPaused: !this.props.autoPlay,
//       isComplete: false,
//     }
//   };

// handleClick = () => {
//   this.setState({ isPaused: !this.state.isPaused })
//   this.props.handleAddFavoriteRoom();
// };

// handleEvent = (obj) => {
//   if (!this.props.loop) {
//     if (obj.currentTime === (obj.totalTime - 1)) {
//       if (this.state.isComplete) {
//         this.setState({ isStopped: true, isComplete: false })
//       } else {
//         this.setState({ isStopped: false, isComplete: true })
//       }
//     }
//   }
// };

//   render() {
//     const animation = likeAnimation;
//     const defaultOptions = {
//       loop: this.props.loop,
//       autoplay: this.props.autoPlay,
//       animationData: animation,
//       rendererSettings: {
//         preserveAspectRatio: 'xMidYMid slice',
//       },
//     };
//     const makeValidNumber = (value) =>
//         value.substr(value.length - 1) === '%' ? value : Number(value);

//     return (
//         <div className="Animation">
//           <Lottie
//               onClick={this.handleClick}
//               options={defaultOptions}
//               width={makeValidNumber(this.props.width)}
//               height={makeValidNumber(this.props.height)}
//               isStopped={this.state.isStopped}
//               isPaused={this.state.isPaused}
//               speed={2}
//               eventListeners={
//                 [
//                   {
//                     eventName: 'enterFrame',
//                     callback: obj => {
//                       return this.handleEvent(obj)
//                     },
//                   },
//                 ]
//               }
//           />
//         </div>
//     )
//   }
// }

// export default FavoriteAnimation;
