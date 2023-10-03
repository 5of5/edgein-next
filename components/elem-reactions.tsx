import {
  getNameFromListName,
  isOnList,
  toggleFollowOnList,
} from '@/utils/reaction';
import { find } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { EmojiHot, EmojiLike, EmojiCrap } from '@/components/emojis';
import { ElemTooltip } from '@/components/elem-tooltip';
import { useUser } from '@/context/user-context';
import hashSum from 'hash-sum';
import { useRouter } from 'next/router';
import { ElemWithSignInModal } from './elem-with-sign-in-modal';

type Props = {
  className?: string;
  resource: {
    id: number;
    sentiment: Record<'hot' | 'like' | 'crap', number>;
    slug: string | null;
  };
  resourceType: 'companies' | 'vc_firms';
  isInteractive?: boolean;
};

export const ElemReactions: FC<Props> = ({
  className = '',
  resource,
  resourceType,
  isInteractive = true,
}) => {
  return (
    <div className={`flex flex-nowrap space-x-2 ${className}`}>
      <ElemReaction
        type="hot"
        label="Hot"
        count={resource.sentiment?.hot}
        slug={resource.slug!}
        resourceId={resource.id}
        resourceType={resourceType}
        isInteractive={isInteractive}
      />
      <ElemReaction
        type="like"
        label="Like"
        count={resource.sentiment?.like}
        slug={resource.slug!}
        resourceId={resource.id}
        resourceType={resourceType}
        isInteractive={isInteractive}
      />
      <ElemReaction
        type="crap"
        label="Sh**"
        count={resource.sentiment?.crap}
        slug={resource.slug!}
        resourceId={resource.id}
        resourceType={resourceType}
        isInteractive={isInteractive}
      />
    </div>
  );
};

type ReactionProps = {
  type: 'hot' | 'like' | 'crap';
  label: 'Hot' | 'Like' | 'Sh**';
  count: number;
  slug: string;
  resourceId: number;
  resourceType: 'companies' | 'vc_firms';
  isInteractive: boolean;
};

export const ElemReaction: FC<ReactionProps> = ({
  type,
  label,
  count = 0,
  slug,
  resourceId,
  resourceType,
  isInteractive,
}) => {
  const router = useRouter();

  const { listAndFollows, user, refreshProfile } = useUser();

  const [reactionState, setReactionState] = useState(() => {
    const list = find(listAndFollows, item => {
      return getNameFromListName(item) === type;
    });
    const alreadyReacted = isOnList(list, resourceId);
    return { count, alreadyReacted };
  });

  useEffect(() => {
    setReactionState(prev => {
      //console.log({listAndFollowsHashed: hashSum(listAndFollows)})
      const list = find(listAndFollows, item => {
        return getNameFromListName(item) === type;
      });
      const alreadyReacted = isOnList(list, resourceId);
      return { count: prev.count, alreadyReacted };
    });
  }, [listAndFollows, resourceId, type]);

  const alreadyReactedClasses = () => {
    let classes = '';

    if (reactionState.alreadyReacted && type === 'hot') {
      classes = 'text-red-500 hover:text-red-500';
    } else if (reactionState.alreadyReacted && type === 'like') {
      classes = 'text-primary-500 hover:text-primary-500';
    } else if (reactionState.alreadyReacted && type === 'crap') {
      classes = 'text-yellow-800 hover:text-yellow-800';
    } else {
      classes = isInteractive
        ? 'text-slate-400 hover:text-slate-600'
        : 'text-slate-600';
    }

    return classes;
  };

  const handleReactionClick = async (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user) {
      router.push('/sign-in');
    } else {
      setReactionState(prev => {
        let count = prev.count + (prev.alreadyReacted ? -1 : 1);
        if (count < 0) count = 0;
        return {
          count,
          alreadyReacted: !prev.alreadyReacted,
        };
      });
      await toggleFollowOnList({
        resourceId,
        resourceType,
        sentiment: type,
        pathname: `/${resourceType}/${slug}`,
      });
      refreshProfile();
    }
  };

  if (!user) {
    const text = {
      like: "Like this profile? Sign in to make it count, and we'll save it into your liked profiles for you.",
      hot: "Is this profile trending? Sign in to make it count, and we'll save it into your hot profiles for you.",
      crap: "Is this profile sh**? Sign in to make it count, and we'll save it into your disliked profiles for you.",
    }[type];

    return (
      <ElemWithSignInModal
        text={text}
        buttonComponent={open => (
          <div className="flex items-center font-bold ease-in-out duration-150 group cursor-pointer text-slate-400">
            <ElemTooltip content={label}>
              <div
                className={`flex items-center justify-center h-9 w-9 group-active:scale-75 group-active:rotate-6 mr-1 rounded-full overflow-visible ease-in-out duration-150 group-hover:bg-slate-100 ${
                  open ? 'bg-slate-100' : ''
                }`}
              >
                {type === 'hot' && <EmojiHot className="h-6 w-6" />}
                {type === 'like' && <EmojiLike className="h-6 w-6" />}
                {type === 'crap' && <EmojiCrap className="h-6 w-6" />}{' '}
              </div>
            </ElemTooltip>
            <div className="proportional-nums">{reactionState.count || 0}</div>
          </div>
        )}
      />
    );
  }

  return (
    <div
      onClick={handleReactionClick}
      title={label}
      role="button"
      className={`flex items-center font-bold ease-in-out duration-150 ${alreadyReactedClasses()} ${
        isInteractive ? 'group cursor-pointer' : 'cursor-default'
      }`}
    >
      <ElemTooltip
        content={label}
        className={`${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex items-center justify-center h-9 w-9 group-active:scale-75 group-active:rotate-6 mr-1 rounded-full overflow-visible ease-in-out duration-150 group-hover:bg-slate-100">
          {type === 'hot' && <EmojiHot className="h-6 w-6" />}
          {type === 'like' && <EmojiLike className="h-6 w-6" />}
          {type === 'crap' && <EmojiCrap className="h-6 w-6" />}{' '}
        </div>
      </ElemTooltip>
      <div className="proportional-nums">{reactionState.count || 0}</div>
    </div>
  );
};
